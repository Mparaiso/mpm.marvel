/*global describe,beforeEach,it*/
"use strict";
var marvel, assert, noop, cb, RESPONSE_200;

assert = require('assert');
marvel = require('../index');
noop = function() {
	return;
};
/* callback used in tests */
cb = function(cb) {
	return function(err, body) {
		assert.equal(body.code, 200);
		cb(err);
	};
};
RESPONSE_200 = 'response.code should be 200';
describe('marvel', function() {
	beforeEach(function() {
		this.characterId = 1009521;
		this.comicId = 41530;
		this.publicKey = process.env.MARVEL_PUBLIC_KEY;
		this.privateKey = process.env.MARVEL_PRIVATE_KEY;
		this.marvel = marvel(this.publicKey, this.privateKey);
	});
	describe('#constructor', function() {
		it('#publicKey', function() {
			assert.equal(this.marvel.publicKey, this.publicKey);
		});
		it('#privateKey', function() {
			assert.equal(this.marvel.privateKey, this.privateKey);
		});
	});
	describe('#characters', function() {
		it('should be ok', function(done) {
			this.marvel.characters(cb(done));
		});
		it('response.code should be 200 with {limit:3}', function(done) {
			this.marvel.characters({
				limit: 3
			}, cb(done));
		});
		it('should be ok', function(done) {
			this.marvel.characters(this.characterId, cb(done));
		});
		it('should find character with id', function(done) {
			this.marvel.characters({
				id: this.characterId
			}, cb(done));
		});
	});
	describe('#characters#comics', function() {
		it(RESPONSE_200, function(done) {
			this.marvel.characters(this.characterId).comics(cb(done));
		});
	});
	describe('#characters#events', function() {
		it(RESPONSE_200, function(done) {
			this.marvel.characters(this.characterId).events(cb(done));
		});
	});
	describe('#characters#series', function() {
		it(RESPONSE_200, function(done) {
			this.marvel.characters(this.characterId).series(cb(done));
		});
	});
	describe('#characters#stories', function() {
		it(RESPONSE_200, function(done) {
			this.marvel.characters(this.characterId).stories(cb(done));
		});
	});
	describe('#comics', function() {
		it(RESPONSE_200, function(done) {
			this.marvel.comics(cb(done));
		});
	});
	describe('#comics#characters', function() {
		it(RESPONSE_200, function(done) {
			this.marvel.comics(this.comicId).characters(cb(done));
		});
	});
	describe('#comics#creators', function() {
		it(RESPONSE_200, function(done) {
			this.marvel.comics(this.comicId).creators(cb(done));
		});
	});
	describe('#comics#events', function() {
		it(RESPONSE_200, function(done) {
			this.marvel.comics(this.comicId).events(cb(done));
		});
	});
	describe('#comics#stories', function() {
		it(RESPONSE_200, function(done) {
			this.marvel.comics({id:this.comicId,limit:3}).stories(cb(done));
		});
	});
	describe('#creators', function() {
		it('response.code should be 200', function(done) {
			this.marvel.creators(cb(done));
		});
	});
	describe('#creators#comics', noop);
	describe('#creators#events', noop);
	describe('#creators#series', noop);
	describe('#creators#stories', noop);
	describe('#events', function() {
		it('response.code should be 200', function(done) {
			this.marvel.events(cb(done));
		});
	});
	describe('#events#characters', noop);
	describe('#events#comics', noop);
	describe('#events#creators', noop);
	describe('#events#series', noop);
	describe('#events#stories', noop);
	describe('#series', function() {
		it('response.code should be 200', function(done) {
			this.marvel.series(cb(done));
		});
	});
});