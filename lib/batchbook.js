var request = require('request');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;

var Client = module.exports = exports = function Client (options) {
  if(!options) throw new Error('account name and api_key are required');
  if(!options.account) throw new Error('account name is required');
  if(!options.key) throw new Error('key is required');

  this.account = options.account;
  this.key = options.key;
  this.endpoints = {
    people: 'people',
    companies: 'companies',
    custom_field_sets: 'custom_field_sets',
    users: 'users',
    roles: 'roles',
    communications: 'communications'
  };
  this.ext = (options.ext) ? options.ext : 'json';
};

inherits(Client, EventEmitter);

/**
 * Gets document from `endpoint`, optional params `{key:value}`
 * @param {String} endpoint
 * @param {Object} options
 * @return {Object}
 * @api public
 */
Client.prototype.get = function(endpoint, options) {
  if(!endpoint) throw new Error('provide a batchbook endpoint');
  if(typeof options === 'function') callback = options;

  return request({
    method: 'GET',
    uri: this.getUrl(endpoint, options),
    encoding: 'utf8'
  });
};

/**
 * Gets document from `endpoint`, optional params `{key:value}`, `callback`.
 * @param {String} endpoint
 * @param {Object} options
 * @param {function} callback
 * @api public
 */
Client.prototype.getSync = function(endpoint, options, callback) {
  if(!endpoint) throw new Error('provide a batchbook endpoint');
  if(typeof options === 'function') callback = options;
  if(typeof callback !== 'function') throw new Error('provide a callback function');

  request({
    method: 'GET',
    uri: this.getUrl(endpoint, options),
    encoding: 'utf8'
  }, function(err, resp, body) {
    callback(err, resp, body);
  });
};

/**
 * Post to `endpoint`, provide endpoint object `{key:value}`
 * @param {String} endpoint
 * @param {Object} data
 * @return {Object}
 * @api public
 */
Client.prototype.post = function(endpoint, data) {
  if(!endpoint) throw new Error('provide a batchbook endpoint');
  if(!data) throw new Error('provide a json document to save');
  data = this.formatData(data);

  return request({
    method: 'POST',
    uri: this.getUrl(endpoint),
    json: data
  });
};

/**
 * Post to `endpoint`, provide endpoint object `{key:value}`, `callback`.
 * @param {String} endpoint
 * @param {Object} data
 * @param {Function} callback
 * @api public
 */
Client.prototype.postSync = function(endpoint, data, callback) {
  if(!endpoint) throw new Error('provide a batchbook endpoint');
  if(!data) throw new Error('provide a json document to save');
  if(typeof callback !== 'function') throw new Error('provide a callback function');
  data = this.formatData(data);

  request({
    method: 'POST',
    uri: this.getUrl(endpoint),
    json: data
  }, function(err, res, body) {
    callback(err, res, body);
  });
};

/**
 * Puts to `endpoint` and list of params `{ key: value}`, and optional `callback`.
 * @param {String} endpoint
 * @param {Object} data
 * @return {Object}
 * @api public
 */
Client.prototype.put = function(endpoint, data) {
  if(!endpoint) throw new Error('provide a batchbook endpoint');
  data = this.formatData(data);

  return request({
    method: 'PUT',
    uri: this.getPutUrl(endpoint, data),
    json: data
  });
};

/**
 * Request with `endpoint` and list of params `{ key: value}`, and optional `callback`.
 * @param {String} endpoint
 * @param {Object} data
 * @param {Function} callback
 * @api public
 */
Client.prototype.putSync = function(endpoint, data, callback) {
  if(!endpoint) throw new Error('provide a batchbook endpoint');
  if(!data) throw new Error('provide id of document to update');
  if(typeof callback !== 'function') throw new Error('provide a callback function');
  data = this.formatData(data);

  request({
    method: 'PUT',
    uri: this.getPutUrl(endpoint, data),
    json: data
  }, function(err, res, body) {
    callback(err, res, body);
  });
};

/**
 * Deletes a document from batchbook based on the `id`
 * @param {String} endpoint
 * @param {int} id
 * @returns {Object}
 */
Client.prototype.delete = function(endpoint, id) {
  return request({
    method: 'DELETE',
    uri: this.getUrl(endpoint, id)
  });
};

Client.prototype.deleteSync = function(endpoint, id, callback) {
  request({
    method: 'DELETE',
    uri: this.getUrl(endpoint, id)
  }, function(err, res, body) {
    callback(err, res, body);
  });
};

/**
 * Formats the `data` for batchbook
 * @param {Object} data
 * @returns {Object}
 */
Client.prototype.formatData = function(data) {
  if(typeof data !== 'object')
    throw new Error('data needs to be a proper json document');

  if(!data.person)
    return {person: data};

  return data;
};

/**
 * Returns a qualified endpoint to the batchbook api
 * @param {String} endpoint
 * @param {Object} options
 * @returns {String}
 */
Client.prototype.getUrl = function(endpoint, options) {
  var url = 'https://' + this.account + '.batchbook.com/api/v1/' + this.endpoints[endpoint];
  var cred = '?auth_token=' + this.key;

  if(typeof options === 'function' || !options) {
    url += '.' + this.ext + cred;
  } else if(options && typeof options === 'object') {
    url += '.' + this.ext + cred;
    var keys = Object.keys(options);
    keys.forEach(function(key) {
      url += '&' + key + '=' + options[key];
    });
  } else {
    url += '/' + options + '.' + this.ext + cred;
  }

  console.log(url,options);
  return  url;
};

/**
 * Returns a url formatted for PUT requests
 * @param {String} endpoint
 * @param {Object} data
 * @returns {String} url
 */
Client.prototype.getPutUrl = function(endpoint, data) {
  var url = 'https://' + this.account + '.batchbook.com/api/v1/' + this.endpoints[endpoint];
  var cred = '?auth_token=' + this.key;

  if(!data.person.id)
    throw new Error('put data is wrong ensure you provide an id in the document object');

  url += '/' + data.person.id + '.' + this.ext + cred;

  return url;
};

exports.createClient = function(options) {
  return new Client(options);
};

