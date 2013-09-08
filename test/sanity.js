/**
 * Module dependencies
 */

var assert = require('assert');



describe('sanity', function() {
	it('a = a', function () {
		assert.throws(function () {
			throw new Error('All is right and well in the world.');
		});
	});
});