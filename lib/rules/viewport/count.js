// modules
var async             = require('async');
var url               = require('url');
var cheerio           = require('cheerio');
var S                 = require('string');
var _                 = require('underscore');

module.exports = exports = function(payload, fn) {

  // get the data from the payload
  var data = payload.getData()

  // get the page content
  payload.getPageContent(function(err, content) {

    // did we get a error ?
    if(err) return fn(err);

    // sanity check if we found the page content
    if(S(content || '').isEmpty() == true)
      return fn(null);

    // the items
    var viewportEls = [];

    // load in the document
    var $ = cheerio.load(content);

    // search for all the meta tags in the page under head
    $('head > meta[name=viewport]').each(function(i, elem){

      // add to the list of tags
      viewportEls.push(elem)

    });

    // check the amount of viewports
    if(viewportEls.length === 0) {

      // add the broken rule
      payload.addRule({

        type:           'error',
        message:        'Mobile viewport not specified',
        key:            'viewport.missing'

      });

    } else if(viewportEls.length > 1) {

      // build the lines
      var lines     = (content || '').split('\n');
      var lastLine  = -1;

      // loop them all
      for(var i = 0; i < viewportEls.length; i++) {

        // find the code snippet
        var build = payload.getSnippetManager().build(lines, lastLine, function(line) {

          // done
          return line.indexOf('<meta') != -1 && 
                  line.indexOf('viewport') != -1;

        });

        // check the build
        if(!build) continue;

        // set the lastline
        lastLine = build.subject;

        // add the rule broken
        payload.addRule({

          type:         'error',
          message:      'Multiple viewports specified',
          key:          'viewport.multiple'

        }, {

          display:      'code',
          code:         build,
          message:      'Found multiple viewports, one of which contains $',
          identifiers:  [

            $(viewportEls[i]).attr('content') || ''

          ]

        });

      }

    }

    // finish
    fn(null);

  });

};

