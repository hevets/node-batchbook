var batchbook = require('../index.js');

var client = batchbook.createClient({
  account: 'apitest',
  key: 'GR5doLv88FrnLyLGIwok'
});

client.get('people').on('response', function(res) {
  console.log(res);
});