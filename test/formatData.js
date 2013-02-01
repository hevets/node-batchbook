var test = require('tap').test;
var client = require('./lib/client');

test("test formatData", function(t) {
  var proper = { person: { first_name : 'steve', last_name : 'henderson'}};
  var person = { first_name : 'steve', last_name : 'henderson' };
  var invalidData = 'first_name=steve';

  t.test('\ninvalid data', function(t) {
    t.plan(1);
    t.throws(function() { client.formatData(invalidData)});
  });

  t.test('\nproper data', function(t) {
    t.plan(1);
    t.similar(client.formatData(proper), proper, 'should be correct data unchanged');
  });

  t.test('\nsimple object formatted by format data', function(t) {
    t.plan(1);
    t.similar(client.formatData(person), proper, 'should be formatted to proper data');
  });

});