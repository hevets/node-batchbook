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
 *
 * @param {String} endpoint
 * @param {Object} params
 * @param {function} callback
 * @return {Request Object}
 * @api public
 */
Client.prototype.get = function(endpoint, params, callback) {
  var self = this;

  if(!endpoint) throw new Error('provide a batchbook endpoint');
  if(callback) {
    if(typeof callback !== 'function') throw new Error('callback needs to be a function()');

    return request({
      uri: this.getUrl(endpoint, params),
      encoding: 'utf8'
    }, function(err, resp, body) {
      return callback(err, resp, body);
    });
  } else {
    return request({
      uri: this.getUrl(endpoint, params),
      encoding: 'utf8'
    });
  }
};

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

  return  url;
};

exports.createClient = function(options) {
  return new Client(options);
};

