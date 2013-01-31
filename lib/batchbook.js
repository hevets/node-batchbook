var request = require('request');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;

var Client = module.exports = exports = function Client (options) {
  var self = this;

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
 * Request with `endpoint` and list of params `{ key: value}`, and optional `callback`.
 * @param {String} endpoint
 * @param {Object} options
 * @return {Request Object}
 * @api public
 */
Client.prototype.get = function(endpoint, options) {
  if(!endpoint) throw new Error('provide a batchbook endpoint');
  if(typeof callback !== 'function') throw new Error('provide a callback function');

  return request({
    method: 'GET',
    uri: this.getUrl(endpoint, options),
    encoding: 'utf8'
  });
};

/**
 * Request with `endpoint` and list of params `{ key: value}`, and optional `callback`.
 * @param {String} endpoint
 * @param {Object} options
 * @param {function} callback
 * @return {Request Object}
 * @api public
 */
Client.prototype.getSync = function(endpoint, options, callback) {
  if(!endpoint) throw new Error('provide a batchbook endpoint');
  if(typeof callback !== 'function') throw new Error('provide a callback function');

  request({
    method: 'GET',
    uri: this.getUrl(endpoint, options),
    encoding: 'utf8'
  }, function(err, resp, body) {
    return callback(err, resp, body);
  });
};

/**
 * Request with `endpoint` and list of params `{ key: value}`, and optional `callback`.
 * @param {String} endpoint
 * @param {Object} data
 * @return {Request Object}
 * @api public
 */
Client.prototype.post = function(endpoint, data) {
  if(!endpoint) throw new Error('provide a batchbook endpoint');

  return request({
    method: 'POST',
    uri: this.getUrl(endpoint),
    json: data
  });
};

/**
 * Request with `endpoint` and list of params `{ key: value}`, and optional `callback`.
 * @param {String} endpoint
 * @param {Object} data
 * @param {Function} callback
 * @return {Request Object}
 * @api public
 */
Client.prototype.postSync = function(endpoint, data, callback) {
  if(!endpoint) throw new Error('provide a batchbook endpoint');
  if(typeof callback !== 'function') throw new Error('provide a callback function');

  return request({
    method: 'POST',
    uri: this.getUrl(endpoint),
    json: data
  }, function(err, res, body) {
    return callback(err, res, body);
  });
};

/**
 * Request with `endpoint` and list of params `{ key: value}`, and optional `callback`.
 * @param {String} endpoint
 * @param {Object} options
 * @return {Request Object}
 * @api public
 */
Client.prototype.put = function(endpoint, options) {

};

/**
 * Request with `endpoint` and list of params `{ key: value}`, and optional `callback`.
 * @param {String} endpoint
 * @param {Object} options
 * @param {function} callback
 * @return {Request Object}
 * @api public
 */
Client.prototype.putSync = function(endpoint, options, callback) {

}

/**
 * Returns a qualified endpoint to the batchbook api
 * @param {String} endpoint
 * @param {Object} options
 * @returns {String}
 */
Client.prototype.getUrl = function(endpoint, options) {
  var url = 'https://' + this.account + '.batchbook.com/api/v1/' + this.endpoints[endpoint];
  var cred = '?auth_token=' + this.key;

  if(!options) {
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

  console.log(url);
  return  url;
};

exports.createClient = function(options) {
  return new Client(options);
};

