var test = require('tap').test;
var client = require('./lib/client');

test('test formatId', function(t) {
  var id = 10;

  t.test('\ninvalid id', function(t) {
    t.plan(2);
    t.throws(function() {client.formatId()}, 'no id given');
    t.throws(function() { client.formatId({name:'steve'})}, 'object passed in with no id');
  });

  t.test('\nvalid response', function(t) {
    t.plan(2);
    t.equals(client.formatId(10), id, 'should equal ' + id);
    t.equals(client.formatId({id:10}), id, 'should equal ' + id);
  });
});

