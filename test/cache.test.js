/*global describe,it,beforeEach,before*/
"use strict";
var mongoose, cache, assert, url;

mongoose = require('mongoose');
cache = require('../index').cache;
assert = require('assert');
url = require('url');

before(function() {
	this.connection_string = process.env.MONGODB_TEST;
	this.collectionName = "entries";
	mongoose.connect(this.connection_string);
});

describe('cache', function() {
	beforeEach(function(done) {
		mongoose.connection.collection(this.collectionName).remove(done);
	});
	describe('#Mongoose', function() {
		beforeEach(function() {
			var self = this;
			this.uri = "http://api.com/path/name/id?foo=bar";
			this.parsedUri = url.parse(this.uri);
			this.cache = cache.Mongoose(mongoose, "Entry");
			this.entry = {
				uri: this.parsedUri,
				data: {
					foo: "bar"
				}
			};
			this.requestErrorMock = function(uri, callback) {
				return callback(new Error('Some error'));
			};
			this.requestMock = function(uri, callback) {
				return callback(undefined, undefined, self.entry);
			};
		});
		it('should be a function', function() {
			assert(this.cache.execute instanceof Function);
			assert(this.cache.request);
			assert(this.cache.duration);
		});
		it('should execute request and return an error', function(done) {
			this.cache.request = this.requestErrorMock;
			this.cache.execute(this.uri, function(err, res) {
				assert(err);
				done();
			});
		});
		it('should execute request and save entry in the database', function(done) {
			var self = this;
			this.cache.request = this.requestMock;
			this.cache.execute(this.uri, function(err, res) {
				assert(!err);
				assert(res);
				self.cache.Entry.find(function(err, res) {
					assert.equal(res.length, 1);
					console.log(res);
					done();
				});
			});
		});
	});

});