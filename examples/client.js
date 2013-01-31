var batchbook = require('../index.js');
var request = require('request');

var client = batchbook.createClient({
  account: 'apitest',
  key: 'GR5doLv88FrnLyLGIwok'
});

//client.get('people', 32).once('data', function(res) {
//  console.log('1st request', res);
//});
//
//client.getSync('people', {tags: "awesome", email: "ekrause@batchblue.com"}, function(err, resp, body) {
//  console.log('callback request', body);
//});
//
//client.get('companies').once('data', function(res) {
//  console.log('2nd request', res);
//});
//
var data =
  {
    "first_name": "steve"
  };
//
client.postSync('people', data, function(err, res, body) {
  console.log(err);
  console.log(res.statusCode);
  console.log(body);
});

//client.put('people', {first_name: 'steve', last_name: 'bobeav'}).once('response', function(res) {
//  console.log(res.statusCode);
//});

//client.putSync('people', {id: 40, first_name: "myro"}, function(err, res, body) {
//  console.log(res.statusCode);
//});

//client.deleteSync('people', 42, function(err, res, body) {
//  console.log(res.statusCode);
//});
