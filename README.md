# BatchBook CRM API Wrapper (for node)
read more about the [batchbook-api](https://github.com/batchblue/batchbook-api)

## Usage
Using batchbook is easy, create a client, start doing things.

``` js
var batchbook = require('batchbook');

var client = batchbook.createClient({
  key: 'api_key',
  account: 'account_name'
});
```

## GET
Get a list of documents, batchbook has a 30 document maximum [github/batchbook](https://github.com/batchblue/batchbook-api)
``` js
// to stream...
client.get('people', {tags: 'awesome'}).once('data', function(res) {
  console.log(res);
});

// ...or not to stream
client.getSync('people', {email: 'someguy@somebusiness.com'}, function(err, resp, body) {
  console.log(body);
});
```

Getting a single document
``` js
client.get('people', 39).once('data', function(res) {
  console.log(res);
});
```

## POST
Create a document on batchbook, it'll return the created document along with it's batchbook id :)
``` js
// to stream...
client.post('people', {first_name: 'Steve', last_name: 'Henderson'}).once('data', function(res) {
  console.log(res);
});

// ..or not to stream
client.postSync('people', {first_name: 'Steve', last_name: 'Henderson'}, function(err, res, body) {
  console.log(res.statusCode);
  console.log(body);
});
```

## PUT
Update a document on batchbook, make sure you also pass in the document's id!
``` js
// to stream...
client.put('people', {id: 39, first_name: 'Andy'}).once('response', function(res) {
  console.log(res.statusCode);
});

// ...or not to stream
client.putSync('people', {id: 39, first_name: 'Andy'}, function(err, res, body) {
  console.log(res.statusCode);
});
```

## DELETE
``` js
// to stream...
client.delete('people', 39).once('response', function(res) {
  console.log(res.statusCode);
});

// ...or not to stream
client.deleteSync('people', 39, function(err, res, body) {
  console.log(res.statusCode);
});
```

## TODO's
- Finish writing tests for requests
- XML style post, put, deletes (don't know if this will ever get done)


