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

Client.prototype.get = function(endpoint, params) {
  var self = this;

  if(!endpoint) throw new Error('');
  params = (params) ? params : {};

  request({
    uri: this.getUrl(endpoint, params),
    encoding: 'utf8'
  }).on('data', function(res) {
    self.emit('response', res);
  }).on('error', function(err) {
    self.emit('error', err);
  });

  return this;
};

Client.prototype.getUrl = function(endpoint, params) {
  var url = 'https://' + this.account + '.batchbook.com/api/v1/people.' + this.ext + '?auth_token=' + this.key;

  return url;
}

exports.createClient = function(options) {
  return new Client(options);
}

