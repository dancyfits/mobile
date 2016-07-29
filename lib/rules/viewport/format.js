// required modules
var async             = require('async');
var url               = require('url');
var cheerio           = require('cheerio');
var S                 = require('string');
var _                 = require('underscore');

/**
* list of properties we must see
* to consider a viewport setting "sane"
**/
requiredViewportParams = [

  'width=device-width',
  'initial-scale=1'

]

module.exports = exports = function(payload, fn) {

  // get the data from the payload
  data          = payload.getData()

  // get the page content
  payload.getPageContent(function(err, content) {

    // did we get a error ?
    if(err) return fn(err);

    // sanity check if we found the page content
    if(S(content || '').isEmpty() == true)
      return fn(null);

    // load in the document
    $ = cheerio.load(content)

    // handle the item
    $('head > meta').each(function(i, elem) {

      // clean up the name
      name = $(elem).attr('name') || '';

      // check if this is for the viewport ... ?
      if(name != 'viewport') return;

      // get the content and clean it up a bit
      content = $(elem).attr('content') || ''
      content = content.replace(/\s/gi, '');
      content = content.toLowerCase()

      // remove decimal numbers
      content = content.replace(/\.0/gi, '');

      // create tokens from the content
      tokens = content.split(',');

      // check if we have all the required formats
      var formattedCorrectly = _.every(
        requiredViewportParams,
        function(requiredViewportParam) {

          return tokens.indexOf( requiredViewportParam ) != -1;

        });

      // check if not empty
      if(S(content).isEmpty() == true) {

        // add our broken rule
        payload.addRule({

          type: 'error',
          message: 'Empty viewport',
          key: 'viewport.empty'

        }, {

            display: 'text',
            message: 'Empty viewport found, expected at least $ for pages optimized to display well on mobile devices',
            identifiers: [

              requiredViewportParams.join(', ')

            ]

          });

      } else if(formattedCorrectly === false) {

        // add our broken rule
        payload.addRule({

          type: 'error',
          message: 'Suboptimal configuration for mobile viewport',
          key: 'viewport.content'

        }, {

            display: 'text',
            message: 'Found $ but expected at least $ for pages optimized to display well on mobile devices',
            identifiers: [

              content,
              requiredViewportParams.join(', ')

            ]

          });

      }

    });

    // finish
    fn(null);

  });

};
