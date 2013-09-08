/**
 * Module dependencies
 */

var request			= require('request'),
	_				= require('lodash'),
	Err				= require('./errors'),
	querystring		= require('querystring'),
	toCSV			= require('./util/toCSV'),
	isHTTPMethod	= require('./util/isHTTPMethod'),
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
		if ( typeof options.fields !== 'undefined' ) {
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


		// Communicate w/ Deezer
		request(apiRequest, function createSessionResponse (err, r, body) {

			// Handle non-200 status codes & unexpected results
			if (err) return cb(err);
			var status = r.statusCode;
			if (status !== 200 && body) {
				// Attempt to parse error body as JSON
				try {
					body = JSON.parse(body);
					return cb(body);
				}
				catch (e) { return cb(body); }
			}
			if (!body) return cb(Err.unknownResponseFromDeezer(r));
			// NOTE: When an error API is documented for Deezer OAuth API calls,
			// a more structured/semantic error response should be implemented here

			// Attempt to parse response body as form values
			// (see example here: http://developers.deezer.com/api/oauth)			
			var parsedResponse = querystring.parse(body);
			if (!parsedResponse.access_token) {
				// If no access_token exists, this must be an error
				// Attempt to parse error body as JSON
				try {
					body = JSON.parse(body);
					if (body.error && body.error.message) {
						return cb(body.error.message);
					}
				}
				// if deezer sent invalid json
				catch (e) {
					return cb(
						'Deezer sent a non-JSON response :: ' + '\n' +
						util.inspect(body, false, 4)
					);
				}
				// if deezer sent json, but it's in an unexpected format
				return cb(
					'Deezer sent an unexpected JSON response :: ' + '\n' +
					util.inspect(body, false, 4)
				);
			}
			
			// Cast `expires` result to either `false` or a natural number ( > 0 )
			// i.e. we'll allow the `expires` value to be missing from the response,
			// but we assume that means the token *never* expires!
			if (!parsedResponse.expires) parsedResponse.expires = false;
			// NOTE: `expires` represents the number of seconds remaining before 
			// the access token expires
			
			// Send back parsed response
			cb(null, parsedResponse);
		});
	}

};