var batchbook = require('../index.js');
var request = require('request');

var client = batchbook.createClient({
  account: 'apitest',
  key: 'GR5doLv88FrnLyLGIwok'
});

// GET
client.get('people').once('data', function(res) {
  console.log('async get', res);
});

client.getSync('people', {first_name: 'Steve'}, function(err, resp, body) {
  console.log('sync get', body);
});

client.get('people', 68).once('data', function(res) {
  console.log('async get single people', res);
});


// POST
client.post('people', {first_name: 'Steve', last_name: 'Henderson'}).once('data', function(res) {
  console.log('async create people', res);
});

client.postSync('people', {first_name: 'Steve', last_name: 'Henderson'}, function(err, res, body) {
  console.log('sync create people', body);
});


// PUT
client.put('people', {id: 39, first_name: 'Andy'}).once('response', function(res) {
  console.log(res.statusCode);
});

client.putSync('people', {id: 68, first_name: 'Jeff'}, function(err, res, body) {
  console.log(res.statusCode);
});


// DELETE
client.delete('people', 39).once('response', function(res) {
  console.log(res.statusCode);
});

client.deleteSync('people', 68, function(err, res, body) {
  console.log(res.statusCode);
});