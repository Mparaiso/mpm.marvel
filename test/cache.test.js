/*global describe,it,beforeEach,before*/
"use strict";
var mongoose, cache, assert, url, uri, parsedUri, cacheData, sinon;

require('source-map-support').install();

mongoose = require('mongoose');
cache = require('../index').cache;
assert = require('assert');
url = require('url');
sinon = require('sinon');

uri = "http://api.com/path/name/id?foo=bar";
parsedUri = url.parse(uri);

before(function(done) {
	this.connection_string = process.env.MONGODB_TEST;
	this.modelName = "Entry";
	this.collectionName = "entries";
	mongoose.connect(this.connection_string);
	mongoose.connection.collection(this.collectionName).remove(done);
});

describe('cache', function() {
	describe('#Mongoose', function() {
		beforeEach(function(done) {
			var self = this;
			this.cache = cache.Mongoose(mongoose, "Entry"); // cache strategy
			this.data = {
				foo: "bar"
			}; // data from API request
			this.requestErrorMock = function(uri, callback) {
				console.log("executing requestErrorMock");
				return callback(new Error('Some error'));
			};
			this.requestMock = function(uri, callback) {
				return callback(undefined, undefined, self.data);
			};
			mongoose.connection.collection(this.collectionName).remove(done);
		});
		it('should be a function', function() {
			assert(this.cache.execute instanceof Function);
			assert(this.cache.request);
			assert(this.cache.duration);
		});
		it('should execute request and return an error', function(done) {
			this.cache.request = this.requestErrorMock;
			this.cache.execute(uri, function(err, res) {
				assert(err);
				done();
			});
		});
		it('should execute request and save entry in the database', function(done) {
			var self = this;
			this.cache.request = this.requestMock;
			this.cache.execute(uri, function(err, res) {
				assert(!err);
				assert(res);
				self.cache.Entry.find(function(err, res) {
					assert.equal(res.length, 1);
					// console.log(res);
					done();
				});
			});
		});
		it('should get data from Mongoose cache instead of the mocked API', function(done) {
			var entry, self;

			entry = new this.cache.Entry();
			self = this;
			this.cache.request = sinon.spy(this, 'requestMock');
			entry.set(cacheData);
			entry.save(function(err, res) {
				assert(!err);
				assert(res);
				self.cache.execute(uri, function(err, res) {
					assert(!err);
					assert(res);
					assert(!self.cache.request.called);
					done();
				});
			});
		});
	});

});

// cache data for cached data testing
cacheData = {
	uri: parsedUri,
	data: {
		foo: 'bar'
	},
	expires_at: Date.now() + cache.defaultDuration,
	created_at: Date.now()
};