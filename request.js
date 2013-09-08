/**
 * Module dependencies
 */

var request			= require('request'),
	_				= require('lodash'),
	Err				= require('./errors'),
	querystring		= require('querystring'),
	toCSV			= require('./util/toCSV'),
	isHTTPMethod	= require('./util/isHTTPMethod'),
	handleApiError	= require('./util/apiError'),
	util			= require('util');





/**
 * Core API request logic
 */

module.exports = {


	/**
	 * Send an arbitrary API request to Deezer
	 *
	 * @param {String} accessToken			(the OAuth token representing a user's session)
	 * @param {Object} options
	 *		resource {String}				(the string name of resource, e.g. 'album')
	 *		method {HTTPMethod|undefined}	(the REST method [defaults to 'get'])
	 * @param {Function} cb
	 *		@param {Error|null} err
	 */

	request: function (accessToken, options, cb) {


		if ( typeof accessToken !== 'string' ) {
			throw Err.invalidArgument('accessToken', accessToken, ['string']);
		}
		if ( !_.isPlainObject(options) ) {
			throw Err.invalidArgument('options', options, ['object']);
		}
		if ( !_.isFunction(cb) ) {
			throw Err.invalidArgument('cb', cb, ['Function']);
		}
		if ( typeof options.resource !== 'string' ) {
			throw Err.invalidArgument('options.resource', options.resource, ['string']);
		}
		if ( !_.isPlainObject(options.fields) && typeof options.fields !== 'undefined' ) {
			throw Err.invalidArgument('options.fields', options.fields, ['object', 'undefined']);
		}

		// Default `options.fields` to {}
		if ( !options.fields ) {
			options.fields = {};
		}

		// Default `options.method` to HTTP GET and ensure that it is lowercased
		if ( !isHTTPMethod(options.method) ) {
			options.method = 'get';
		}
		options.method = options.method.toLowerCase();


		// Build request
		var apiRequest = {
			url		: this.endpoints.resources + '/' + options.resource,
			method	: options.method
		};

		// Use different field encoding depending on HTTP method
		if (options.method === 'get') paramEncoding = 'qs';

		// Currently, all API methods expect fields in the query string
		else paramEncoding = 'qs';

		// For reference, in case of API change:
		// [One of: 'form', 'json', 'qs', or 'body']
		// if 'body', fields must be encoded into a string or buffer beforehand
		// else if (options.method === 'post') paramEncoding = 'form';
		// else if (options.method === 'put') paramEncoding = 'form';
		// else if (options.method === 'delete') paramEncoding = 'form';

		// Build field set
		apiRequest[paramEncoding] = options.fields;

		// Always embed access_token as a parameter
		apiRequest[paramEncoding].access_token = accessToken;

		// Communicate w/ Deezer
		request(apiRequest, function apiResponse (err, r, body) {

			// Catch API errors in a standardized way
			err = handleApiError(err, r, body);
			if (err) return cb(err);

			// Attempt to parse response body as form values
			// (see example here: http://developers.deezer.com/api/oauth)			
			var parsedResponse;
			try {
				parsedResponse = JSON.parse(body);

				// Handle structured Deezer error
				if (parsedResponse.error && parsedResponse.error.message) {
					return cb(parsedResponse.error.message);
				}

				// Handle valid api response
				if ( typeof parsedResponse.status !== 'undefined') {
					return cb(null, parsedResponse);
				}

				// For now, pass Deezer's response straight through
				// since there are too many different kinds of responses
				// to explicitly enumerate them
				return cb(null, parsedResponse);

				// If deezer sent json, but it's in an unexpected format
				// return cb(
				// 	'Deezer sent an unexpected JSON response :: ' + '\n' +
				// 	util.inspect(body, false, 4)
				// );
			}
			// if deezer sent invalid json
			catch (e) {
				return cb(
					'Deezer sent a non-JSON response :: ' + '\n' +
					util.inspect(body, false, 4)
				);
			}			
			
		});
	}

};