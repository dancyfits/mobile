// modules
var assert      = require('assert')
var _           = require('underscore')
var fs          = require('fs');
var passmarked  = require('passmarked');
var pluginFunc  = require('../lib/rules/amp');

describe('amp', function(){

  describe('charset', function(){

    it('Should return the error if no head is present', function(done){

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

          return item.key==='amp.charset';

        });

        // no rules
        if(!rule)
          assert.fail('Was expecting the rule');

        // done
        done();

      });

    });

    it('Should return a error if the charset is not the first of the head', function(done){

      // create a dummy payload
      var payload = passmarked.createPayload(
        {

          url: 'http://example.com'

        },
        {},
        '<html amp><head><title>TEST</title><meta charset="utf-8" /></head><body></body></html>');

      // handle the stream
      pluginFunc(payload, function(err){

        // check for a error
        if(err) assert.fail(err);

        // get the rules
        var rules = payload.getRules();

        // check if we got any rules back ...
        var rule = _.find(rules || [], function(item){

          return item.key==='amp.charset';

        });

        // no rules
        if(!rule)
          assert.fail('Was expecting the rule');

        // done
        done();

      });

    });

    it('Should not return the rule if the charset was first of the head block', function(done){

      // create a dummy payload
      var payload = passmarked.createPayload(
        {

          url: 'http://example.com'

        },
        {},
        '<html amp><head><meta charset="utf-8" /><title>TEST</title></head><body></body></html>');

      // handle the stream
      pluginFunc(payload, function(err){

        // check for a error
        if(err) assert.fail(err);

        // get the rules
        var rules = payload.getRules();

        // check if we got any rules back ...
        var rule = _.find(rules || [], function(item){

          return item.key==='amp.charset';

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
