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
		assert.throws(deezer.init, /compatible/);
		assert.throws(deezer.api, /compatible/);
		assert.throws(deezer.login, /compatible/);
		assert.throws(deezer.logout, /compatible/);
		assert.throws(deezer.getLoginStatus, /compatible/);
		assert.throws(deezer.player, /compatible/);
		assert.throws(deezer.player.play, /compatible/);
		assert.throws(deezer.player.pause, /compatible/);
		assert.throws(deezer.player.next, /compatible/);
		assert.throws(deezer.player.prev, /compatible/);
		assert.throws(deezer.player.setVolume, /compatible/);
		assert.throws(deezer.player.seek, /compatible/);
		assert.throws(deezer.player.playTracks, /compatible/);
		assert.throws(deezer.player.playAlbum, /compatible/);
		assert.throws(deezer.player.playPlaylist, /compatible/);
		assert.throws(deezer.player.playRadio, /compatible/);
		assert.throws(deezer.player.playSmartRadio, /compatible/);
		assert.throws(deezer.Event.subscribe, /compatible/);
	});
});