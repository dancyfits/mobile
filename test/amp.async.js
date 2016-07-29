// modules
var assert      = require('assert')
var _           = require('underscore')
var fs          = require('fs');
var passmarked  = require('passmarked');
var pluginFunc  = require('../lib/rules/amp');

describe('amp', function(){

  describe('async', function(){

    it('Should not return the error if no head is present', function(done){

      // create a dummy payload
      var payload = passmarked.createPayload(
        {

          url: 'http://example.com'

        },
        {},
        '<html amp><body></body></html>');

      // handle the stream
      pluginFunc(payload, function(err){

        // check for a error
        if(err) assert.fail(err);

        // get the rules
        var rules = payload.getRules();

        // check if we got any rules back ...
        var rule = _.find(rules || [], function(item){

          return item.key==='amp.async';

        });

        // no rules
        if(!rule)
          assert.fail('Was expecting the rule');

        // done
        done();

      });

    });

    it('Should return a error if the script is not marked as async', function(done){

      // create a dummy payload
      var payload = passmarked.createPayload(
        {

          url: 'http://example.com'

        },
        {},
        '<html amp><head><meta charset="utf-8" /><script src="https://cdn.ampproject.org/v0.js"></script><title>TEST</title></head><body></body></html>');

      // handle the stream
      pluginFunc(payload, function(err){

        // check for a error
        if(err) assert.fail(err);

        // get the rules
        var rules = payload.getRules();

        // check if we got any rules back ...
        var rule = _.find(rules || [], function(item){

          return item.key==='amp.async';

        });

        // no rules
        if(!rule)
          assert.fail('Was expecting the rule');

        // done
        done();

      });

    });

    it('Should not return the rule if the script is marked as async', function(done){

      // create a dummy payload
      var payload = passmarked.createPayload(
        {

          url: 'http://example.com'

        },
        {},
        '<html amp><head><meta charset="utf-8" /><title>TEST</title><script async src="https://cdn.ampproject.org/v0.js"></script></head><body></body></html>');

      // handle the stream
      pluginFunc(payload, function(err){

        // check for a error
        if(err) assert.fail(err);

        // get the rules
        var rules = payload.getRules();

        // check if we got any rules back ...
        var rule = _.find(rules || [], function(item){

          return item.key==='amp.async';

        });

        // no rules
        if(rule)
          assert.fail('Was not expecting the rule');

        // done
        done();

      });

    });

  });

});
