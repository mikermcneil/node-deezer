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



describe('deezer#createSession()', function() {


	describe('proper behavior for invalid input', function() {

		it('should throw when `code` is invalid or not present', function() {
			assert.throws(function() { deezer.createSession(); });
			assert.throws(function() { deezer.createSession( {} ); });
			assert.throws(function() { deezer.createSession( [] ); });
			assert.throws(function() { deezer.createSession( function bigNastyWrongThing() {} ); });
		});

		it('should throw when `secret` is invalid or not present', function() {
			assert.throws(function() { deezer.createSession('asddg4sgdagsd'); });
			assert.throws(function() { deezer.createSession('asddg4sgdagsd', {} ); });
			assert.throws(function() { deezer.createSession('asddg4sgdagsd', [] ); });
			assert.throws(function() { deezer.createSession('asddg4sgdagsd', function bigNastyWrongThing() {} ); });
		});

		it('should throw when `cb` is invalid or not present', function() {
			assert.throws(function() { deezer.createSession('asddg4sgdagsd', '8j4ajdgkasdgjasdg'); });
			assert.throws(function() { deezer.createSession('asddg4sgdagsd', '8j4ajdgkasdgjasdg', {} ); });
			assert.throws(function() { deezer.createSession('asddg4sgdagsd', '8j4ajdgkasdgjasdg', [] ); });
			assert.throws(function() { deezer.createSession('asddg4sgdagsd', '8j4ajdgkasdgjasdg', 'asdg'); });
		});

		it('should not throw when required arguments are present and valid', function () {
			deezer.createSession('2z49h4a--DA  FHIˆ øøîüïø284', 'asdgjg9sdj9sdgaj', function someCb() {} );
		});
	});


});