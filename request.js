/**
 * Module dependencies
 */

var request			= require('request'),
	_				= require('lodash'),
	querystringify	= require('querystring').stringify,
	Err				= require('./errors'),
	affordances		= require('./affordances'),
	toCSV			= require('./util/toCSV');





/**
 * Core API request logic
 */

module.exports = {


	/**
	 * Send an API request to Deezer
	 *
	 * @param {String} accessToken		(the OAuth token representing a user's session)
	 * @param {Function} cb
	 *		@param {Error|null} err
	 */

	request: function () {
		// TODO: stub
	}

};