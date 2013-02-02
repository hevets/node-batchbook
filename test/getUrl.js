var test = require('tap').test;
var client = require('./lib/client');

test("test getUrl", function(t) {
  var peopleResult = 'https://apitest.localhost:1337/people.json' +
    '?auth_token=GR5doLv88FrnLyLGIwok' +
    '&first_name=steve' +
    '&last_name=henderson';

  var multiTagResult = 'https://apitest.localhost:1337/people.json' +
    '?auth_token=GR5doLv88FrnLyLGIwok' +
    '&tags=awesome' +
    '&tags=super-awesome';

  t.test('\ninvalid method calls', function(t) {
    t.plan(2);
    t.throws(function() { client.getUrl()}, 'no endpoint supplied');
    t.throws(function() {client.getUrl('peeple')}, 'invalid endpoint');
  });

  t.test('\nendpoint with no parameters', function(t) {
    t.plan(1);
    t.equals(client.getUrl('people'), peopleResult.split('&')[0], 'get all people');
  });

  t.test('\nendpoint with multiple parameters', function(t) {
    t.plan(1);
    t.equals(client.getUrl('people', {first_name: 'steve', last_name: 'henderson'}), peopleResult, 'get all people with multiple params');
  });

  t.test('\nendpoint with parameters as a callback', function(t){
    t.plan(1);
    t.equals(client.getUrl('people', function() {}), peopleResult.split('&')[0],'callback in place of parameters field');
  });

});

