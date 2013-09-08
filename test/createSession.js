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

	describe('callback', function() {
		it('should fire', function (cb) {
			deezer.createSession('asddg4sgdagsd', '8j4ajdgkasdgjasdg', 'asdgasagsdsgd', function (err) {
				// Ignore error, since inputs are clearly invalid
				// Instead validate that this callback fires at all
				cb();
			});
		});

		it('should contain error when crazy, random inputs are used', function (cb) {
			deezer.createSession('asddg4sgda$*(ADADGHADhagsd', '8j4ajdgkasdgjasaAFHOdg', 'asDdgasagsdsgd', function (err) {
				// If there is no error, there is something wrong
				if (!err) return cb(new Error('createSession() should have responded w/ an error!'));
				cb();
			});
		});
	});


	describe('proper behavior for invalid input', function() {

		it('should throw when `appId` is invalid or not present', function() {
			assert.throws(function() { deezer.createSession(); });
			assert.throws(function() { deezer.createSession( {} ); });
			assert.throws(function() { deezer.createSession( [] ); });
			assert.throws(function() { deezer.createSession( function bigNastyWrongThing() {} ); });
		});

		it('should throw when `code` is invalid or not present', function() {
			assert.throws(function() { deezer.createSession('asddg4sgdagsd'); });
			assert.throws(function() { deezer.createSession('asddg4sgdagsd', 235235 ); });
			assert.throws(function() { deezer.createSession('asddg4sgdagsd', {} ); });
			assert.throws(function() { deezer.createSession('asddg4sgdagsd', [] ); });
			assert.throws(function() { deezer.createSession('asddg4sgdagsd', function bigNastyWrongThing() {} ); });
		});

		it('should throw when `secret` is invalid or not present', function() {
			assert.throws(function() { deezer.createSession('asddg4sgdagsd', '82hgahdsgha49'); });
			assert.throws(function() { deezer.createSession('asddg4sgdagsd', '82hgahdsgha49', 235235 ); });
			assert.throws(function() { deezer.createSession('asddg4sgdagsd', '82hgahdsgha49', {} ); });
			assert.throws(function() { deezer.createSession('asddg4sgdagsd', '82hgahdsgha49', [] ); });
			assert.throws(function() { deezer.createSession('asddg4sgdagsd', '82hgahdsgha49', function bigNastyWrongThing() {} ); });
		});

		it('should throw when `cb` is invalid or not present', function() {
			assert.throws(function() { deezer.createSession('asddg4sgdagsd', '82hgahdsgha49', 'ag4asdjgajasdg'); });
			assert.throws(function() { deezer.createSession('asddg4sgdagsd', '82hgahdsgha49', 'ag4asdjgajasdg', 235235 ); });
			assert.throws(function() { deezer.createSession('asddg4sgdagsd', '82hgahdsgha49', 'ag4asdjgajasdg', {} ); });
			assert.throws(function() { deezer.createSession('asddg4sgdagsd', '82hgahdsgha49', 'ag4asdjgajasdg', [] ); });
			assert.throws(function() { deezer.createSession('asddg4sgdagsd', '82hgahdsgha49', 'ag4asdjgajasdg', 'sadggsad'); });
		});

		it('should not throw when required arguments are present and valid', function () {
			deezer.createSession('2z49h4a--DA  FHIˆ øøîüïø284', 'asdgjg9sdj9sdgaj', 'adgsdgasdgasdg', function someCb() {} );
		});
	});


});