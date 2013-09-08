/**
 * Module dependencies
 */

var _				= require('lodash');

/**
 * _.map for objects, keeps key/value associations
 */

module.exports = function mapObj (input, mapper, context) {
	return _.reduce(input, function(obj, v, k) {
		obj[k] = mapper.call(context, v, k, input);
		return obj;
	}, {}, context);
};