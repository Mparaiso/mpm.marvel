"use strict";
/**
 * @author mparaiso <mparaiso@online.fr>
 * @license LGPL
 */

/**
 * @namespace
 */
var marvel = require('./js/marvel');
marvel.request = require('./js/request');
marvel.cache = require('./js/cache');
module.exports = marvel;