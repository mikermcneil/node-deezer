// Grab node-deezer dependency
var DZ = require('../../../');

// Grab your app credentials
var appCredentials = require('../deezerCredentials');

// Your app id:  (also shared globally in our app)
// (from developers.deezer.com)
var appId = appCredentials.id;

// Your app secret: (also shared globally in our app)
// (from developers.deezer.com)
var appSecret = appCredentials.secret;

// Create an instance of the deezer library for our app
// (this is used globally in our application, and that's ok)
var deezer = new DZ();


/*
 * get the user's deezer user profile
 * (accessed via http://localhost:3000)
 */

exports.me = function(req, res, next) {
	deezer.request(req.session.deezer.token, {
		resource: 'user/me',
		method: 'get'
	}, function (err, result) {
		if (err) return next(err);
		res.json(result);
	});
};