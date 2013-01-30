node-batchbook
==============

# BatchBook CRM API Wrapper

## Usage
Using batchbook is easy, create a client, start doing things.

``` js
var batchbook = require('batchbook');

var client = batchbook.createClient({key: api_key, account: account_name});
```

## node-batchbook uses request to call the api
``` js
// The Stream way...returns a request object
client.get('people', {tags: 'awesome'}).once('data', function(res) {
  console.log(res.people);
});

// The callback way
client.get('people', {email: 'someguy@somebusiness.com'}, function(err, resp, body) {
  console.log(body);
});
```

