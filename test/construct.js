var test = require('tap').test;
var batchbook = require('../lib/batchbook');

test("test formatData", function(t) {
  var account =  'apitest';
  var key = 'GR5doLv88FrnLyLGIwok';
  var host = 'localhost:1337/';
  var ext = 'xml';
  var encoding = 'ascii';


  t.test('\nbad createClient params', function(t) {
    t.plan(3);
    t.throws(function() {batchbook.createClient()}, 'no parameters');
    t.throws(function() {batchbook.createClient({account: 'apitest'})}, 'key is required');
    t.throws(function() {batchbook.createClient({key: 'GR5doLv88FrnLyLGIwok'})}, 'account is required');
  });

  t.test('\ndefault properties', function(t) {
    t.plan(2);

    var client = batchbook.createClient({
      account: account,
      key: key
    });

    t.equals(client.account, account, 'account should be ' + account);
    t.equals(client.key, key, 'key should be ' + key);
  });

  t.test('\ncustom parameters', function(t) {
    t.plan(3);

    var custom = batchbook.createClient({
      account: account,
      key: key,
      host: host,
      ext: ext,
      encoding: encoding
    });

    t.equals(custom.host, host, 'host should be ' + host);
    t.equals(custom.ext, ext, 'host should be ' + ext);
    t.equals(custom.encoding, encoding, 'host should be ' + encoding);
  });

});