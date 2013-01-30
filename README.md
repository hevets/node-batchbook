node-batchbook
==============

# BatchBook CRM API Wrapper

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
``` js
/**
 * Request with `endpoint` with a [list of options `{ key: value}`, or a single `id`], and optional `callback`.
 *
 * @param {String} endpoint
 * @param {Object} options or {Integer} id
 * @param {function} callback
 * @return {Request Object}
 * @api public
 */
// to stream...
client.get('people', {tags: 'awesome'}).once('data', function(res) {
  console.log(res.people);
});

// ...or not to stream
client.get('people', {email: 'someguy@somebusiness.com'}, function(err, resp, body) {
  console.log(body);
});
```

``` js
// getting back a single person
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

