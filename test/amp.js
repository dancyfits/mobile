// modules
var assert      = require('assert')
var _           = require('underscore')
var fs          = require('fs');
var passmarked  = require('passmarked');
var pluginFunc  = require('../lib/rules/amp');

describe('amp', function(){

  describe('enabled', function(){

    it('Should not return a error if AMP is not enabled on the page', function(done){

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

        // no rules
        if(rules.length > 0)
          assert.fail('Was not expecting the rule');

        // done
        done();

      });

    });

  });

});
