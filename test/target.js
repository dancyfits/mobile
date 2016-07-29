// modules
var assert      = require('assert')
var _           = require('underscore')
var fs          = require('fs');
var passmarked  = require('passmarked');
var pluginFunc  = require('../lib/rules/target');

describe('target', function(){

  it('Should not return a error if targets meet the size requirements', function(done){

    // create a dummy payload
    var payload = passmarked.createPayload(
      {

        url: 'http://example.com',
        targets: [

          {

            type: "anchor",
            height: 48,
            width: 48

          }

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

      // check if we got any rules back ...
      var rule = _.find(rules || [], function(item){

        return item.key==='target.size';

      });

      // did we find the rule ?
      if(rules.length > 0) {

        // nope did not find it
        assert.fail("Expected 0 rules, got " + rules.length);

      }

      // done
      done();

    });

  });

  it('Should not return a error if targets are bigger than the size requirements', function(done){

    // create a dummy payload
    var payload = passmarked.createPayload(
      {

        url: 'http://example.com',
        targets: [

          {

            type: "anchor",
            height: 96,
            width: 96

          }

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

  it('Should return a error if targets are smaller than the size requirements', function(done){

    // create a dummy payload
    var payload = passmarked.createPayload(
      {

        url: 'http://example.com',
        targets: [

          {

            type: "anchor",
            height: 36,
            width: 36

          }

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

      // check if we got any rules back ...
      var rule = _.find(rules || [], function(item){

        return item.key==='target.size';

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
