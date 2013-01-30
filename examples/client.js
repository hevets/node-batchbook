var batchbook = require('../index.js');

var client = batchbook.createClient({
  account: 'apitest',
  key: 'GR5doLv88FrnLyLGIwok'
});

client.get('people', 32).once('data', function(res) {
  console.log('1st request', res);
});

client.get('people', {tags: "awesome", email: "ekrause@batchblue.com"}, function(err, resp, body) {
  console.log('callback request', body);
});

client.get('companies').once('data', function(res) {
  console.log('2nd request', res);
});

