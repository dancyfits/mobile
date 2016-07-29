// modules
var assert      = require('assert')
var _           = require('underscore')
var fs          = require('fs');
var passmarked  = require('passmarked');
var pluginFunc  = require('../lib/rules/viewport/format');

describe('viewport.format', function(){

  it('Should return no rules if no viewports are specified', function(done){

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

      // check if we got any rules back ...
      var rule = _.find(rules || [], function(item){

        return item.key==='viewport.empty';

      });

      // did we find the rule ?
      if(rule) {

        // nope did not find it
        assert.fail("Error should not have been returned");

      }

      // done
      done();

    });

  });

  it('Should return a error on blank viewport, wrong attribute', function(done){

    // create a dummy payload
    var payload = passmarked.createPayload(
      {

        url: 'http://example.com'

      },
      {},
      '<html><head><meta name="viewport" value=""/></head></html>');

    // handle the stream
    pluginFunc(payload, function(err){

      // check for a error
      if(err) assert.fail(err);

      // get the rules
      var rules = payload.getRules();

      // check if we got any rules back ...
      var rule = _.find(rules || [], function(item){

        return item.key==='viewport.empty';

      });

      // did we find the rule ?
      if(!rule) {

        // nope did not find it
        assert.fail("Empty error was not returned");

      }

      // done
      done();

    });

  });

  it('Should return a error on blank viewport, really blank', function(done){

    // create a dummy payload
    var payload = passmarked.createPayload(
      {

        url: 'http://example.com'

      },
      {},
      '<html><head><meta name="viewport" content=""/></head></html>');

    // handle the stream
    pluginFunc(payload, function(err){

      // check for a error
      if(err) assert.fail(err);

      // get the rules
      var rules = payload.getRules();

      // check if we got any rules back ...
      var rule = _.find(rules || [], function(item){

        return item.key==='viewport.empty';

      });

      // did we find the rule ?
      if(!rule) {

        // nope did not find it
        assert.fail("Empty error was not returned");

      }

      // done
      done();

    });

  });

  it('Should return a error with the misconfigured viewport "initial-scale=1"', function(done){

    // create a dummy payload
    var payload = passmarked.createPayload(
      {

        url: 'http://example.com'

      },
      {},
      '<html><head><meta name="viewport" content="initial-scale=1"/></head></html>');

    // handle the stream
    pluginFunc(payload, function(err){

      // check for a error
      if(err) assert.fail(err);

      // get the rules
      var rules = payload.getRules();

      // check if we got any rules back ...
      var rule = _.find(rules || [], function(item){

        return item.key==='viewport.content';

      });

      // did we find the rule ?
      if(!rule) {

        // nope did not find it
        assert.fail("Formatting error was not returned");

      }

      // done
      done();

    });

  });

  it('Should return a error with the misconfigured viewport "width=device-width"', function(done){

    // create a dummy payload
    var payload = passmarked.createPayload(
      {

        url: 'http://example.com'

      },
      {},
      '<html><head><meta name="viewport" content="width=device-width, "/></head></html>');

    // handle the stream
    pluginFunc(payload, function(err){

      // check for a error
      if(err) assert.fail(err);

      // get the rules
      var rules = payload.getRules();

      // check if we got any rules back ...
      var rule = _.find(rules || [], function(item){

        return item.key==='viewport.content';

      });

      // did we find the rule ?
      if(!rule) {

        // nope did not find it
        assert.fail("Formatting error was not returned");

      }

      // done
      done();

    });

  });

  it('Should not return a error for a correctly configured viewport', function(done){

    // create a dummy payload
    var payload = passmarked.createPayload(
      {

        url: 'http://example.com'

      },
      {},
      '<html><head><meta name="viewport" content="initial-scale=1,width=device-width"/></head></html>');

    // handle the stream
    pluginFunc(payload, function(err){

      // check for a error
      if(err) assert.fail(err);

      // get the rules
      var rules = payload.getRules();

      // check if we got any rules back ...
      var rule = _.find(rules || [], function(item){

        return item.key==='viewport.content';

      });

      // did we find the rule ?
      if(rule) {

        // nope did not find it
        assert.fail("Formatting error should not have been returned");

      }

      // done
      done();

    });

  });

});
