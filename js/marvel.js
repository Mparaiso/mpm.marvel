// Generated by CoffeeScript 1.7.1
"use strict";

/*
 * @author mparaiso <mparaiso@online.fr>
 * @license LGPL
 */
var crypto, events, http, marvel, request, url, util;

http = require('http');

util = require('util');

events = require('events');

url = require('url');

request = require('./request');

crypto = require('crypto');


/**
 * marvel api
 * @namespace
 * @param  {String} publicKey
 * @param  {String} privateKey
 * @return {marvel.Marvel}
 */

marvel = function(publicKey, privateKey) {
  return new marvel.Marvel(publicKey, privateKey);
};


/**
 * hash a string
 * @param  {String} string the string to hash
 * @return {String}
 */

marvel.md5 = function(string) {
  return crypto.createHash('md5').update(string).digest('hex');
};

marvel.host = "gateway.marvel.com";

marvel.protocol = "http";

marvel.rootPath = 'v1/public';


/*
 * A hash of entities
 * @type {Array}
 */

marvel.entities = [
  {
    name: "characters",
    url: "characters",
    links: ["comics", "events", "series", "stories"]
  }, {
    name: "comics",
    url: "comics",
    links: ['characters', 'creators', 'events', 'stories']
  }, {
    name: "creators",
    url: "creators",
    links: ['comics', 'events', 'series', 'stories']
  }, {
    name: "events",
    url: "events",
    links: ['characters', 'comics', 'creators', 'series', 'stories']
  }, {
    name: "series",
    url: "series",
    links: ['characters', 'comics', 'creators', 'events', 'stories']
  }, {
    name: "stories",
    url: 'stories',
    links: ['characters', 'comics', 'creators', 'events']
  }
];

marvel.Marvel = (function() {

  /*
   * [Marvel description]
   * @param {String} publicKey
   * @param {String} privateKey
   */
  function Marvel(publicKey, privateKey, _request) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
    this._request = _request;
    if (this._request == null) {
      this._request = new request.Request();
    }

    /* the api is created dynamically according to the entity array */
    marvel.entities.forEach((function(_this) {
      return function(entity) {
        var F, options;
        options = {};

        /*
         * F
         * @param {String}   id
         * @param {Function} callback
         * @return {F|request.Request}
         */
        F = function(id, callback) {
          _this.timestamp = Date.now();
          if (id instanceof Function) {

            /* argument 1 is a function,argument 1 is the callbacks */
            callback = id;
            id = void 0;
          } else if (typeof id === 'object') {

            /* id is a option hash */
            options = id;
            id = id.id;
          }
          F.request = _this._request;
          F.publicKey = _this.publicKey;
          F.privateKey = _this.privateKey;
          F.urlOptions = {
            protocol: marvel.protocol,
            host: marvel.host,
            pathname: marvel.rootPath.concat('/').concat(entity.url).concat(id ? '/'.concat(id) : ''),
            query: {
              ts: _this.timestamp,
              apikey: _this.publicKey,
              hash: marvel.md5(_this.timestamp + _this.privateKey + _this.publicKey)
            }
          };

          /*if options , copy options to query hash */
          Object.keys(options).forEach(function(key) {
            return F.urlOptions.query[key] = options[key];
          });

          /*if callback execute callback */
          if (callback) {
            return F.request.execute(url.format(F.urlOptions), callback);
          }

          /* else create entity functions */
          entity.links.forEach(function(link) {
            return F[link] = _this.makeLink(F, link);
          });
          return F;
        };

        /* end forEach */
        return _this[entity.name] = F;
      };
    })(this));
  }


  /*
   * Create a link entity function
   * @param  {Function} parent entity
   * @param {String} link link name
   * @return {Function}
   */

  Marvel.prototype.makeLink = function(F, link) {

    /*
     * entity link function
     * @param  {Object}   options
     * @param  {Function} callback
     * @return {marvel.request}
     */
    return function(options, callback) {

      /*if callback first argument then callback is options */
      var timestamp, urlOptions;
      if (options instanceof Function) {
        callback = options;
        options = void 0;
      }
      timestamp = Date.now();
      urlOptions = {
        protocol: marvel.protocol,
        host: marvel.host,
        pathname: F.urlOptions.pathname.concat('/').concat(link),
        query: {
          ts: timestamp,
          apikey: F.urlOptions.query.apikey,
          hash: marvel.md5(timestamp + F.privateKey + F.publicKey)
        }
      };
      if (options) {
        Object.keys(options).forEach(function(key) {
          return urlOptions.query[key] = options[key];
        });
      }
      return F.request.execute(url.format(urlOptions), callback);
    };
  };

  return Marvel;

})();

module.exports = marvel;

//# sourceMappingURL=marvel.map
