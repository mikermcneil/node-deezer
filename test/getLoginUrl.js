/**
 * Module dependencies
 */

var assert	= require('assert'),
	check	= require('validator').check;






/**
 * Fixtures
 */

var DZ = require('../');
var deezer = new DZ();



describe('deezer#getLoginUrl()', function() {

	describe('proper return value', function() {

		it('should return a valid url', function () {
			assert.doesNotThrow(function () {
				var loginUrl = deezer.getLoginUrl(1234, 'localhost');
				check(loginUrl).isUrl();
			});
			assert.doesNotThrow(function () {
				var loginUrl = deezer.getLoginUrl(1234, 'zz&!&AG??localhos  wgeee gat');
				check(loginUrl).isUrl();
			});
		});

	});


	describe('proper behavior for invalid input', function() {

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