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

Client.prototype.get = function(endpoint, params, callback) {
  var self = this;

  if(!endpoint) throw new Error('provide a batchbook endpoint');
  if(params && typeof params !== 'object') throw new Error('params need to be defined as an object');
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

Client.prototype.getUrl = function(endpoint, params) {
  var url = 'https://' + this.account + '.batchbook.com/api/v1/' + this.endpoints[endpoint] + '.' + this.ext + '?auth_token=' + this.key;
  if(params) {
    var keys = Object.keys(params);
    keys.forEach(function(key) {
      url += '&' + key + '=' + params[key];
    });
  }

  return url;
}

exports.createClient = function(options) {
  return new Client(options);
}

