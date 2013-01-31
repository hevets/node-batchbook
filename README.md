node-batchbook
==============

# BatchBook CRM API Wrapper
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
Get a list of documents, batchbook has a 25 document maximum [github/batchbook](https://github.com/batchblue/batchbook-api)
``` js
// to stream...
client.get('people', {tags: 'awesome'}).once('data', function(res) {
  console.log(res.people);
});

// ...or not to stream
client.get('people', {email: 'someguy@somebusiness.com'}, function(err, resp, body) {
  console.log(body);
});
```

Getting a single document
``` js
client.get('people', 19).once('data', function(res) {
  console.log(res.people);
});
```

## POST
``` js

```

## PUT
``` js

```

## DELETE
``` js

```



## TODO's
- XML style post, put, deletes (don't know if this)

