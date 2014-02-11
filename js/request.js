// Generated by CoffeeScript 1.7.1
"use strict";

/*
 * @author mparaiso <mparaiso@online.fr>
 * @license LGPL
 */
var request, _request;

_request = require('request');


/*
 * @namespace
 */

request = exports;


/*
 * http client API, can be mocked and cached
 * @type {function}
 */

request.Request = (function() {
  function Request() {}

  Request.prototype.request = _request;

  Request.prototype.execute = function(uri, callback) {
    if (this.cache && this.cache.execute instanceof Function) {
      return this.cache.execute(uri, callback);
    } else {
      return this.request(uri, function(err, res, body) {
        if (err) {
          return callback(err);
        } else {
          return callback(void 0, JSON.parse(body));
        }
      });
    }
  };

  return Request;

})();

//# sourceMappingURL=request.map
