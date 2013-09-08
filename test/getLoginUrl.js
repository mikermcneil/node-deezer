/**
 * Module dependencies
 */

var assert = require('assert');






/**
 * Fixtures
 */

var DZ = require('../');
var deezer = new DZ();






describe('deezer', function() {

	describe('#getLoginUrl()', function() {

		it('should throw when appId is invalid or not present', function() {
			assert.throws(function() {
				deezer.getLoginUrl();
			});
			assert.throws(function() {
				deezer.getLoginUrl( {} );
			});
			assert.throws(function() {
				deezer.getLoginUrl( [] );
			});
			assert.throws(function() {
				deezer.getLoginUrl( function bigNastyWrongThing() {} );
			});
		});

		it('should throw when callbackUrl is invalid or not present', function() {
			assert.throws(function() {
				deezer.getLoginUrl(1234);
			});
			assert.throws(function() {
				deezer.getLoginUrl(1234, function bigNastyWrongThing () {} );
			});
		});

		it('should not throw when required arguments are present and valid', function () {
			deezer.getLoginUrl(2349284, 'http://localhost');
			deezer.getLoginUrl('2z49h4a--DA  FHIˆ øøîüïø284', 'http://jello.com/foo?jiggliness=32');
		});

	});

});