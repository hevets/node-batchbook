var test = require('tap').test;
var batchbook = require('../lib/batchbook');

var client = batchbook.createClient({
  account: 'apitest',
  key: 'GR5doLv88FrnLyLGIwok'
});

test("test getUrl", function(t) {
  var peopleResult = 'https://apitest.batchbook.com/api/v1/people.json?auth_token=GR5doLv88FrnLyLGIwok';

  t.test('no params', function(t) {
    t.plan(1);
    t.throws(function() { client.getUrl()});
  });

  t.test('invalid end point', function(t) {
    t.plan(1);
    t.throws(client.getUrl('peeple'));
  });

});

