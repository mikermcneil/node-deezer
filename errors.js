/**
 * Module-wide errors
 */

module.exports = {

	notCompatible: function (methodName) {
		return new Error('\n' + 
			'This method (`' + methodName + '`) ' +
			'cannot be used on the server by Node.js.'
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
			'But instead got: ' + util.inspect(actualValue) );
	}

};