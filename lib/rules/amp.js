// required modules
var async             = require('async');
var url               = require('url');
var cheerio           = require('cheerio');
var S                 = require('string');

// vendored libs
var ampValidator      = require('../../vendor/amp/');

module.exports = exports = function(payload, fn) {

  // get the data from the payload
  var data = payload.getData()

  // get the content of the page
  payload.getPageContent(function(err, content) {

    // did we get a error ?
    if(err) return fn(err);

    // sanity check if we found the page content
    if(S(content || '').isEmpty() == true)
      return fn(null);

    // load in the document
    var $ = cheerio.load(content);

    // do we have amp enabled
    var isEnabled = $('html') && 
          ($('html').attr('amp') !== undefined || 
            $('html').attr('⚡') !== undefined);

    // skip if AMP was not enabled on a page
    if(isEnabled === false) return fn(null);

    // page must have head and body
    if($('html > head').length === 0) {

      // add the rule
      payload.addRule({

        key:      'amp.head',
        message:  'The <head> tag is required according to AMP spec',
        type:     'error'      

      })  

    }

    // page must have head and body
    if($('html > body').length === 0) {

      // add the rule
      payload.addRule({

        key:      'amp.body',
        message:  'The <body> tag is required according to AMP spec',
        type:     'error'        

      })  

    }

    // get the meta
    var charsetMeta = $('head').children().first();

    // page must have head and body
    if(!charsetMeta || charsetMeta.attr('charset') !== 'utf-8') {

      // add the rule
      payload.addRule({

        key:      'amp.charset',
        message:  'Charset meta tag must be present and the first element of the head',
        type:     'error'        

      })  

    }

    // check the last element in head
    var ampScriptTag = $('html > head').children().last();

    // check if we got the tag to check
    if(ampScriptTag) {

      // get the url
      var ampScriptUrl = (ampScriptTag.attr('src') || '').toLowerCase();

      // this must be a script tag and include the url
      if(ampScriptUrl.indexOf('cdn.ampproject.org/v') == -1) {

        // add the rule
        payload.addRule({

          key:          'amp.script',
          message:      'Library for AMP must be included as the last element of head',
          type:         'error'

        });

      }      

      // also check if this was marked as async
      if(ampScriptTag.attr('async') === undefined) {

        // add the rule
        payload.addRule({

          key:          'amp.async',
          message:      'Library for AMP must be marked as async',
          type:         'error'

        });

      }

    } else {

      // add the rule
      payload.addRule({

        key:          'amp.script',
        message:      'Library for AMP must be included as the last element of head',
        type:         'error'

      });

    }

    // did we find it 
    if(!ampScriptTag 
        || (ampScriptTag.attr('src') 
              || '').toLowerCase().indexOf() == -1) {



    }

    // get the lines
    var lines = content.split('\n');

    // run the validator
    ampValidator.validate(content, function(err, results) {

      // check if we failed ?
      if(!results) return fn(null);

      // skip if we got a error
      if(results.status == 'FAIL')
        return fn(null);

      // loop the errors
      for(var i = 0; i < (results.errors || []).length; i++) {

        // local reference
        var error = results.errors[i];

        // pull out the source code
        var startLine         = payload.getSnippetManager().getStart(lines, error.line, 3);
        var endLine           = payload.getSnippetManager().getEnd(lines, error.line, 3);
        var codeSnippet       = payload.getSnippetManager().slice(lines, startLine, endLine);

        // get the message
        var message           = ampValidator.render( error )
        var publicMessage     = S(message).trim().chompRight('.').s
        var occurenceMessage  = publicMessage.toString()

        // replace all params in the public message
        var publicMessage     = publicMessage.replace(/\'.*?\'/gi, '$');

        // our internal type
        var type              = 'error';

        // translate to our internal levels
        switch((error.severity || '').toLowerCase()) {

          case 'error': type = 'error'; break;
          case 'warning': type = 'warning'; break;
          case 'notice': type = 'notice'; break;
          case 'ok': type = 'notice'; break;
          default: type = 'error'; break;

        }

        // then add the broken rule
        payload.addRule({

          message:    'AMP - ' + publicMessage,
          key:        S(publicMessage).slugify().s,
          type:       type

        }, {

          display:      codeSnippet ? 'code' : 'text',
          message:      occurenceMessage,
          identifiers:  error.params,
          code: {

            start:      startLine,
            end:        endLine,
            subject:    error.line,
            text:       codeSnippet

          }

        })

      }

      // finish strong :)
      fn(null)

    });

  });

};
