/**
 * Module dependencies
 */

var Err				= require('../errors');




/**
 * Intercept glaring api errors across all sorts
 * of different API responses

 * @returns false if everything is ok, otherwise an error
 */

module.exports = function catchApiError (err, r, body) {

	// Handle non-200 status codes & unexpected results
	if (err) return err;
	var status = r.statusCode;
	if (status !== 200 && body) {
		// Attempt to parse error body as JSON
		try {
			body = JSON.parse(body);
			return body;
		}
		catch (e) { return body; }
	}
	if (!body) return Err.unknownResponseFromDeezer(r);
	// NOTE: When the error API is further documented for Deezer OAuth API calls,
	// a more structured/semantic error response should be implemented here
};

/**
 * Unused now:
 */

// // If 
// if ( typeof parsedResponse.status === 'undefined') {
// 	// If no access_token exists, this must be an error
// 	// Attempt to parse error body as JSON
// 	try {
// 		body = JSON.parse(body);
// 		if (body.error && body.error.message) {
// 			return cb(body.error.message);
// 		}
// 	}
// 	// if deezer sent invalid json
// 	catch (e) {
// 		return cb(
// 			'Deezer sent a non-JSON response :: ' + '\n' +
// 			util.inspect(body, false, 4)
// 		);
// 	}
// 	// if deezer sent json, but it's in an unexpected format
// 	return cb(
// 		'Deezer sent an unexpected JSON response :: ' + '\n' +
// 		util.inspect(body, false, 4)
// 	);
// }