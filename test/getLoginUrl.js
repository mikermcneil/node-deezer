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

		it('should throw when appId is not present', function() {
			assert.throws(function() {
				deezer.getLoginUrl();
			});
		});

		it('should not throw when required arguments are present', function () {
			deezer.getLoginUrl('ag94jad', 'http://localhost');
		});

	});

});