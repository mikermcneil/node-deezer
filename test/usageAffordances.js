/**
 * Module dependencies
 */

var assert = require('assert');

/**
 * Fixtures
 */

var DZ = require('../');
var deezer = new DZ();


describe('deezer#usageAffordances', function() {
	it('should prevent usage of client-side JS methods', function () {
		assert.throws(deezer.init);
		assert.throws(deezer.api);
		assert.throws(deezer.login);
		assert.throws(deezer.logout);
		assert.throws(deezer.getLoginStatus);
		assert.throws(deezer.player);
		assert.throws(deezer.player.play);
		assert.throws(deezer.player.pause);
		assert.throws(deezer.player.next);
		assert.throws(deezer.player.prev);
		assert.throws(deezer.player.setVolume);
		assert.throws(deezer.player.seek);
		assert.throws(deezer.player.playTracks);
		assert.throws(deezer.player.playAlbum);
		assert.throws(deezer.player.playPlaylist);
		assert.throws(deezer.player.playRadio);
		assert.throws(deezer.player.playSmartRadio);
		assert.throws(deezer.Event.subscribe);
	});
});