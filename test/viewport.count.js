// modules
var assert      = require('assert')
var _           = require('underscore')
var fs          = require('fs');
var passmarked  = require('passmarked');
var pluginFunc  = require('../lib/rules/viewport/count');

describe('viewport.count', function(){

  it('Should return a error if no viewport meta tag is specified', function(done){

    // create a dummy payload
    var payload = passmarked.createPayload(
      {

        url: 'http://example.com'

      },
      {},
      fs.readFileSync('./samples/viewport.none.html').toString());

    // handle the stream
    pluginFunc(payload, function(err){

      // check for a error
      if(err) assert.fail(err);

      // get the rules
      var rules = payload.getRules();

      // check if we got any rules back ...
      var rule = _.find(rules || [], function(item){

        return item.key==='viewport.missing';

      });

      // did we find the rule ?
      if(!rule) {

        // nope did not find it
        assert.fail("Error was not expected");

      }

      // done
      done();

    });

  });

  it('Should return a error if the viewport is specified in the body', function(done){
    
    // create a dummy payload
    var payload = passmarked.createPayload(
      {

        url: 'http://example.com'

      },
      {},
      fs.readFileSync('./samples/viewport.body.html').toString());

    // handle the stream
    pluginFunc(payload, function(err){

      // check for a error
      if(err) assert.fail(err);

      // get the rules
      var rules = payload.getRules();

      // check if we got any rules back ...
      var rule = _.find(rules || [], function(item){

        return item.key==='viewport.missing';

      });

      // did we find the rule ?
      if(!rule) {

        // nope did not find it
        assert.fail("Error expecting a error");

      }

      // done
      done();

    });

  });

  it('Should not return error if 1 meta tag is specified', function(done){

    // create a dummy payload
    var payload = passmarked.createPayload(
      {

        url: 'http://example.com'

      },
      {},
      fs.readFileSync('./samples/viewport.blank.html').toString());

    // handle the stream
    pluginFunc(payload, function(err){

      // check for a error
      if(err) assert.fail(err);

      // get the rules
      var rules = payload.getRules();

      // did we find the rule ?
      if(rules.length > 0) {

        // nope did not find it
        assert.fail("Expected 0 rules, got " + rules);

      }

      // done
      done();

    });

  });

  it('Should return a rule with 3 occurences if 3 viewports are present', function(done){

    // create a dummy payload
    var payload = passmarked.createPayload(
      {

        url: 'http://example.com'

      },
      {},
      fs.readFileSync('./samples/viewport.multiple.html').toString());

    // handle the stream
    pluginFunc(payload, function(err){

      // check for a error
      if(err) assert.fail(err);

      // get the rules
      var rules = payload.getRules();

      // check if we got any rules back ...
      var rule = _.find(rules || [], function(item){

        return item.key==='viewport.multiple';

      });

      // did we find the rule ?
      if(!rule) {

        // nope did not find it
        assert.fail("Multiple error was not returned");

      }

      // must be 3
      if(rule.occurrences.length != 3) {

        // fail
        assert.fail('Expected 3 occurences, got ' + rule.occurences.length);

      }

      // done
      done();

    });

  });

});
