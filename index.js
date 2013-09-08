/**
 * Module dependencies
 */

var _				= require('lodash'),
	mapObj			= require('./util/mapObj'),
	Request			= require('./request'),
	OAuth			= require('./oauth'),
	affordances		= require('./affordances');





/**
 * Core DZ object which wraps calls to the Deezer API
 * 
 *
 * Deezer REST API docs: (for reference)
 * http://developers.deezer.com/api
 *
 * API Explorer:
 * http://developers.deezer.com/api/explorer
 */

function DZ (options) {

	// TODO: *Enhancement*
	// allow `options` argument to override core defaults (e.g. apiEndpointUrl)
	// (use case: e.g. future API versions)


	// Pulled from http://developers.deezer.com/api and http://developers.deezer.com/api/oauth
	this.endpoints = {

		// Base URL for accessing core Deezer resources as a particular user
		resources: 'https://api.deezer.com',

		// URL where user should be redirected to allow this app's access to the Deezer API
		userAuth: 'https://connect.deezer.com/oauth/auth.php',

		// URL where the access token for a user can be retrieved
		accessToken: 'https://connect.deezer.com/oauth/access_token.php/'
	};

	
	// Mixin OAuth methods
	_.extend(this, OAuth);

	// Mixin API request methods
	_.extend(this, Request);



	/**
	 * More initialization/configuration logic
	 */

	// Ensure that both URLs have no trailing slash
	this.endpoints = mapObj(this.endpoints, function (url) {
		return url.replace(/\/$/, '');
	});
	

	/**
	 * Apply usage affordances
	 *
	 * (friendly error messages in case a developer is trying to use methods
	 * from the client-side JavaScript SDK)
	 */

	affordances.apply(this);

}

module.exports = DZ;

