node-batchbook
==============

# BatchBook CRM API Wrapper

## Usage
Using batchbook is easy, create a client, start doing things.

``` js
var batchbook = require('batchbook');

var client = batchbook.createClient(api_key);

client.get('people').on('response', function(res) {
  console.log(res.people);
});
```

