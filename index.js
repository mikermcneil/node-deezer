/**
 * Module dependencies
 */

var _				= require('lodash'),
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

function DZ () {

	// Main API endpoint URL
	// Pulled from http://developers.deezer.com/api
	this.apiEndpointUrl = 'https://api.deezer.com';


	// Main authentication endpoint for OAuth
	// Pulled from http://developers.deezer.com/api/oauth
	this.authenticationUrl = 'https://connect.deezer.com/oauth/auth.php';

	
	// Mixin OAuth methods
	_.extend(this, OAuth);

	// Mixin API request methods
	_.extend(this, Request);


	/**
	 * More initialization/configuration logic
	 */

	// Ensure that both URLs have no trailing slash
	this.apiEndpointUrl.replace(/\/$/, '');
	this.authenticationUrl.replace(/\/$/, '');



	/**
	 * Apply usage affordances
	 *
	 * (friendly error messages in case a developer is trying to use methods
	 * from the client-side JavaScript SDK)
	 */

	affordances.apply(this);

}

module.exports = DZ;

