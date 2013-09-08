/**
 * Module dependencies
 */

var _	= require('lodash');




/**
 * Convert an array of strings 
 * into a string of comma-separated values
 */

module.exports = function toCSV (list) {
	return _.reduce(list, function (accumulator, item) {
		if (accumulator === '') return item;
		return accumulator + ',' + item;
	}, '');
};