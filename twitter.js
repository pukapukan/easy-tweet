'use strict';

var OAuth = require('oauth');

var Twitter =  function Twitter(key, secret, token, tokenSecret) {
  this._oAuth = new OAuth.OAuth(
    "http://twitter.com/oauth/request_token",
    "http://twitter.com/oauth/access_token",
    key,
    secret,
    "1.0A",
    null,
    "HMAC-SHA1"
  );
  this._token = token;
  this._tokenSecret = tokenSecret;
};

/*
*/
Twitter.prototype.tweet = function(/* message, options, callback */) {
  var param = { },
  message = arguments[0],
  options,
  callback;

  if (arguments.length === 2) {
    if (typeof(arguments[1]) === 'function') callback = arguments[1];
    else options = arguments[1];
  } else if (arguments.length === 3) {
    options = arguments[1];
    callback = arguments[2];
  }

  options = options || { };
  for(var key in options) {
    param[key] = options[key];
  }
  param.status = message;

  this._oAuth.post(
    "https://api.twitter.com/1.1/statuses/update.json",
    this._token,
    this._tokenSecret,
    param,
    function(error, data) {
      if(callback && typeof(callback) === "function"){
        callback(error, JSON.parse(data));
      }
    });
  };

  module.exports = Twitter;
