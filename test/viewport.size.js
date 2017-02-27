// modules
var assert      = require('assert')
var _           = require('underscore')
var fs          = require('fs');
var passmarked  = require('passmarked');
var pluginFunc  = require('../lib/rules/viewport/size');

describe('viewport.size', function(){

  it('Should not return a error if oversized is empty', function(done){

    // create a dummy payload
    var payload = passmarked.createPayload(
      {

        url: 'http://example.com',
        nodes: [
        ]

      },
      {},
      '<html><head></head></html>');

    // handle the stream
    pluginFunc(payload, function(err){

      // check for a error
      if(err) assert.fail(err);

      // get the rules
      var rules = payload.getRules();

      // did we find the rule ?
      if(rules.length > 0) {

        // nope did not find it
        assert.fail("Expected 0 rules, got " + rules.length);

      }

      // done
      done();

    });

  });

  it('Should not return a error if oversized is undefined', function(done){

    // create a dummy payload
    var payload = passmarked.createPayload(
      {

        url: 'http://example.com'

      },
      {},
      '<html><head></head></html>');

    // handle the stream
    pluginFunc(payload, function(err){

      // check for a error
      if(err) assert.fail(err);

      // get the rules
      var rules = payload.getRules();

      // did we find the rule ?
      if(rules.length > 0) {

        // nope did not find it
        assert.fail("Expected 0 rules, got " + rules.length);

      }

      // done
      done();

    });

  });

  it('Should return a error if oversized node is present', function(done){

    // create a dummy payload
    var payload = passmarked.createPayload(
      {

        url: 'http://example.com',
        nodes: [

          {

            element:  '<div style="width: 1000px;>',
            width:    960,
            viewport: 768

          }

        ]

      },
      {},
      [

        '<html>',
        '<head>',
        '</head>',
        '<body>',
        '<div style="width:1000px;"></div>',
        '</body>',
        '</html>'

      ].join('\n'));

    // handle the stream
    pluginFunc(payload, function(err){

      // check for a error
      if(err) assert.fail(err);

      // get the rules
      var rules = payload.getRules();

      // check if we got any rules back ...
      var rule = _.find(rules || [], function(item){

        return item.key==='viewport.size';

      });

      // did we find the rule ?
      if(!rule) {

        // nope did not find it
        assert.fail("No error was returned");

      }

      // done
      done();

    });

  });

});
