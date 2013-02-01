var test = require('tap').test;
var client = require('./lib/client');

test('test getPutUrl', function(t) {
  var invalid = {first_name: 'steve', last_name: 'henderson'};
  var valid = {person: {id: 10, first_name: 'steve', last_name: 'henderson'}};
  var validResult = 'https://apitest.localhost:1337/people/10.json' +
    '?auth_token=GR5doLv88FrnLyLGIwok';

  console.log(client.getPutUrl('people', valid));
  t.test('\ninvalid parameters', function(t){
    t.plan(2);
    t.throws(function() { client.getPutUrl() }, 'no endpoint');
    t.throws(function() { client.getPutUrl('people', invalid) }, 'endpoint with invalid data');
  });

  t.test('\nvalid parameters', function(t) {
    t.plan(1);
    t.equals(client.getPutUrl('people', valid), validResult);
  });

});

