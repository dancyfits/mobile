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
    if((data.nodes || []).length === 0) 
      return fn(null);

    // loop the nodes
    for(var i = 0; i < (data.nodes || []).length; i++) {

      // build up a nice name
      var tagName = data.nodes[i].tag || '';

      if(data.nodes[i].id)
        tagName = tagName + "#" + data.nodes[i].id;
      else if(data.nodes[i].class)
        tagName = tagName + "." + data.nodes[i].class;

      // loop all the tap targets
      payload.addRule({

        type:           'error',
        message:        'Size content to viewport',
        key:            'viewport.size'

      }, {

        display:      'text',
        message:      '$ with a width of $, showing off-screen when viewing on $ width screen',
        identifiers:  [

          tagName,
          data.nodes[i].width + 'px',
          data.nodes[i].viewport + 'px'

        ]

      });

    }

    // finish
    fn(null);

  });

};

