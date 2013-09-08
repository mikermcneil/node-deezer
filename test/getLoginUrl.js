/**
 * Module dependencies
 */

var assert = require('assert');




/**
 * Fixtures
 */

var DZ = require('../');
var deezer = new DZ();


describe('sanity', function() {
	it('a = a', function () {
		assert.throws(function () {
			throw new Error('All is right and well in the world.');
		});
	});
});


// describe('deezer', function() {

// 	describe('#getLoginUrl()', function() {

// 		it('should throw when appId is not present', function() {
// 			assert.throws(function() {
				
// 			});
// 		});

// 	});

// });