// modules
var assert      = require('assert')
var _           = require('underscore')
var fs          = require('fs');
var passmarked  = require('passmarked');
var pluginFunc  = require('../lib/rules/amp');

describe('amp', function(){

  describe('structure', function(){

    it('Should return a error if AMP is enabled but no body provided', function(done){

      // create a dummy payload
      var payload = passmarked.createPayload(
        {

          url: 'http://example.com'

        },
        {},
        '<html amp><head></head></html>');

      // handle the stream
      pluginFunc(payload, function(err){

        // check for a error
        if(err) assert.fail(err);

        // get the rules
        var rules = payload.getRules();

        // check if we got any rules back ...
        var rule = _.find(rules || [], function(item){

          return item.key==='amp.body';

        });

        // no rules
        if(!rule)
          assert.fail('Was expecting the rule');

        // done
        done();

      });

    });

    it('Should return a error if AMP is enabled but no head provided', function(done){

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

          return item.key==='amp.head';

        });

        // no rules
        if(!rule)
          assert.fail('Was expecting the rule');

        // done
        done();

      });

    });

  });

});
