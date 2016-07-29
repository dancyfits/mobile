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

    // loop all the tap targets
    for(var i = 0; i < (data.targets || '').length; i++) {

      // check the size
      if(

        data.targets[i].height < 48 ||
        data.targets[i].width < 48

       ) {

        // add the rule broken
        payload.addRule({

          type: 'warning',
          message: 'Size Tap Targets Appropriately',
          key: 'target.size'

        }, {

          display: 'text',
          message: 'Tap target was $x$, expected at least 48x48',
          identifiers: [

            data.targets[i].width,
            data.targets[i].height

          ]

        });

      }

    }

    // finish
    fn(null);

  });

};

