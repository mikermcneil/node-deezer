/**
 * Module dependencies
 */

var util		= require('util');





/**
 * Module-wide errors
 */

module.exports = {

	notCompatible: function (methodName) {
		return new Error('\n' + 
			'This method (`' + methodName + '`) from Deezer\'s ' +
			'client-side JavaScript SDK is not compatible with this library ' +
			'because it cannot be used on the server by Node.js.' + '\n' +
			'For documentation on using this Node.js module, check out:' + '\n' + 
			'https://github.com/mikermcneil/node-deezer'
		);
	},

	notYetSupported: function (methodName) {
		return new Error ('\n' +
			'The method (`' + methodName + '`) is ' + 
			'not yet supported by the Deezer API.');
	},

	invalidArgument: function (argName, actualValue, expectedTypes) {
		return new Error ('\n' + 
			'Invalid argument (`' + argName + '`) :: \n' +
			'Expected one of: ' + util.inspect(expectedTypes) + '\n' +
			'But instead got: ' + util.inspect(actualValue) + '\n' +
			'whose type is: ' + typeof(actualValue) );
	},

	unknownResponseFromDeezer: function (response) {
		return new Error ('\n' +
			'An unexpected response was returned from the Deezer API:' + '\n' +
			response );
	}

};
