var test = require('tap').test;
var client = require('./lib/client');

test('test getEndpoint', function(t) {
  var endpoints = Object.keys(client.endpoints);

  console.log(endpoints.length);
  t.test('\ninvalid endpoints', function(t) {
    t.plan(2);
    t.throws(function(){client.getEndpoint()}, 'no endpoint provided');
    t.throws(function(){client.getEndpoint('INVALID')}, 'invalid endpoint');
  });

  t.test('\nvalid endpoint', function(t) {
    t.plan(endpoints.length);

    for(var i = 0; i < endpoints.length; i++) {
      t.equals(client.getEndpoint(endpoints[i]), endpoints[i], 'endpoint should equal ' + endpoints[i]);
    }
  });

});