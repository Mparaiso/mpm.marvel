"use strict";
var underscore, http, util, events, marvel, request, url, crypto, md5;

underscore = require('underscore');
http = require('http');
util = require('util');
events = require('events');
url = require('url');
request = require('request');
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
/**
 * http client API, can be mocked
 * @type {function}
 */
marvel.request = request;
marvel.host = "gateway.marvel.com";
marvel.protocol = "http";
marvel.rootPath = 'v1/public';
/**
 * A hash of entities
 * @type {Array}
 */
marvel.entities = [
	{
		name: "characters",
		url: "characters",
		links: ["comics", "events", "series", "stories"]
	},
	{
		name: "comics",
		url: "comics",
		links: ['characters', 'creators', 'events', 'stories']
	},
	{
		name: "creators",
		url: "creators",
		links: ['comics', 'events', 'series', 'stories']
	},
	{
		name: "events",
		url: "events",
		links: ['characters', 'comics', 'creators', 'series', 'stories']
	},
	{
		name: "series",
		url: "series",
		links: ['characters', 'comics', 'creators', 'events', 'stories']
	},
	{
		name: "stories",
		url: 'stories',
		links: ['characters', 'comics', 'creators', 'events']
	}
];
/**
 * [Marvel description]
 * @param {String} publicKey
 * @param {String} privateKey
 * @return F
 */
marvel.Marvel = function(publicKey, privateKey) {
	this.publicKey = publicKey;
	this.privateKey = privateKey;
	marvel.entities.forEach(function(entity) {
		var options = {};
		/**
		 * F
		 * @param {String}   id
		 * @param {Function} callback
		 * @return {F|marvel.request}
		 */
		var F = function(id, callback) {
			this.timestamp = Date.now();
			//if argument 1 is a function,argument 1 is the callbacks
			if (id instanceof Function) {
				callback = id;
				id = undefined;
				//id is a option hash
			} else if (typeof id === 'object') {
				options = id;
				id = id.id;
			}
			F.publicKey = this.publicKey;
			F.privateKey = this.privateKey;
			F.urlOptions = {
				protocol: marvel.protocol,
				host: marvel.host,
				pathname: marvel.rootPath.concat('/').concat(entity.url).concat(id !== undefined ? '/'.concat(id) : ''),
				query: {
					ts: this.timestamp,
					apikey: this.publicKey,
					hash: marvel.md5(this.timestamp + F.privateKey + F.publicKey)
				}
			};
			//if options , copy options to query hash
			Object.keys(options).forEach(function(key) {
				F.urlOptions.query[key] = options[key];
			}, this);
			if (callback) {
				return marvel.request(url.format(F.urlOptions), callback);
			}
			entity.links.forEach(function(link) {
				F[link] = this.makeLink(F, link);
			}, this);
			return F;
		};
		this[entity.name] = F;
	}, this);
};
/**
 * Create a link entity function
 * @param  {Function} parent entity
 * @param {String} link link name
 * @return {Function}
 */
marvel.Marvel.prototype.makeLink = function(F, link) {
	/**
	 * entity link function
	 * @param  {Object}   options
	 * @param  {Function} callback
	 * @return {marvel.request}
	 */
	return function(options, callback) {
		// if callback first argument then callback is options
		if (options instanceof Function) {
			callback = options;
			options = undefined;
		}
		var timestamp = Date.now();
		var urlOptions = {
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
				urlOptions.query[key] = options[key];
			}, this);
		}
		return marvel.request(url.format(urlOptions), callback);
	};
};
module.exports = marvel;