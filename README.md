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

## GET METHOD

``` js
/**
 * Request with `endpoint` and list of params `{ key: value}`, and optional `callback`.
 *
 * @param {String} endpoint
 * @param {Object} params
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

