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

    // check if we got any nodes
    if((data.oversizedNodes || []).length === 0) 
      return fn(null);

    // loop the nodes
    for(var i = 0; i < data.oversizedNodes.length; i++) {

      // loop all the tap targets
      payload.addRule({

        type:           'error',
        message:        'Size content to viewport',
        key:            'viewport.size'

      }, {

        display:      'text',
        message:      'Content, with a width of $px, showing off-screen when viewing a $px screen',
        identifiers:  [

          data.oversizedNodes[i].width,
          data.oversizedNodes[i].viewport

        ]

      });

    }

    // finish
    fn(null);

  });

};

