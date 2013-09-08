/**
 * Module dependencies
 */

var	Err = require('./errors');



/**
 * Compatibility / warning affordances
 *
 * Run upon initialization, this logic adds stub methods to the main module
 * to catch incorrect usage for developers incorrectly using the JavaScript SDK
 * on the server (rather than the proper docs for this Node.js module)
 *
 * > Note: Methods in the JavaScript SDK are covered here w/
 * > explicit errors to avoid confusion about what's possible from
 * > the server.
 */

module.exports = function ensureProperUsage () {


	this.init = function() {
		throw Err.notCompatible('init');
	};
	this.login = function() {
		throw Err.notCompatible('login');
	};
	this.logout = function() {
		throw Err.notCompatible('logout');
	};
	this.getLoginStatus = function() {
		throw Err.notCompatible('getLoginStatus');
	};
	this.api = function() {
		throw Err.notCompatible('api');
	};

	function playerNotCompatible() {
		throw Err.notCompatible('player');
	}
	this.player = playerNotCompatible;

	this.player.play = playerNotCompatible;
	this.player.pause = playerNotCompatible;
	this.player.next = playerNotCompatible;
	this.player.prev = playerNotCompatible;
	this.player.setVolume = playerNotCompatible;
	this.player.seek = playerNotCompatible;

	this.player.playTracks = playerNotCompatible;
	this.player.playAlbum = playerNotCompatible;
	this.player.playPlaylist = playerNotCompatible;
	this.player.playRadio = playerNotCompatible;
	this.player.playSmartRadio = playerNotCompatible;

	this.Event = {
		subscribe: function() {
			throw Err.notCompatible('Event.subscribe');
		}
	};

};
