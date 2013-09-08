
/**
 * @param {String} str
 * @returns {Boolean} whether a @str is an http method/verb
 */

module.exports = function isHttpMethod (str) {
	if (typeof str !== 'string') return false;
	var verbExpr = /^get|post|put|delete|trace|options|connect|patch|head$/i;
	return !!str.match(verbExpr);
};
