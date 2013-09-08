/*
 * Dependencies
 */

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
 * GET home page.
 * (accessed via http://localhost:3000)
 */

exports.index = function(req, res) {

	// Our redirect URL is:
	// (see handler below)
	var redirectUrl = 'http://localhost:3000/deezerCallback';

	// Special permissions:
	// (defaults to basic_access)
	var permissions = ['basic_access'];




	// Now use node-deezer to generate the the link 
	// where we can redirect our users to login to Deezer
	var authLink = deezer.getLoginUrl(appId, redirectUrl, permissions);

	// Render some HTML, and pass that link down
	res.render('index', {
		title: 'node-deezer example : login',
		authLink: authLink
	});
};






/**
 * Route which renders the dashboard for our app
 *
 * Note: This is only shown when a user is logged in-- 
 * see the checkToken middleware for how the token authentication works
 *
 * (accessed via http://localhost:3000/dashboard)
 */

exports.dashboard = function(req, res, next) {
	res.render('dashboard', {
		title: 'node-deezer example : dashboard'
	});
};





/**
 * Handler to accept callback from Deezer API
 * (accessed via http://localhost:3000/deezerCallback)
 */

exports.deezerCallback = function(req, res, next) {

	// `code` should have been handed back by Deezer as a parameter
	// if it was not, an error occurred, and we must handle it here
	var code = req.param('code');

	if (!code) {
		var err = req.param('error_reason');

		// Known error: 'user_denied'
		// This is the case where the user chooses NOT to allow
		// our app to access their Deezer account.
		if (err === 'user_denied') {
		
			// We could direct them to a page to let them configure 
			// different permissions or explain more about why we need them
			// to accept, but in this case, we'll just redirect back to the 
			// home page
			return res.redirect('/');
		}

		// If Deezer didn't specify an error reason, 
		// (or we don't recognize the error)
		// we can really only guess what went wrong 
		// and try to provide a decent diagnostic message
		if (!err) {
			return next(
				'Deezer encountered an unknown error when ' +
				'logging in the specified user :: ' + util.inspect(req.body)
			);
		}

		// Unknown error reason
		return next(
			'Deezer encountered an unknown error :: ' + util.inspect(err)
		);
	}


	// If we made it here, everything worked!

	// Since we have this code, we can trust that the user 
	// actually meant to grant us access to their account.
	
	// Now we need to combine this code with our app credentials 
	// to prove to Deezer that we're a valid app-- if everything works,
	// we'll get an `access_token` we can use to represent the user
	// for a period of time (or "forever" if we have the offline_access permission)
	deezer.createSession(appId, appSecret, code, function (err, result) {
		
		// If an error occurs, we should handle it however makes sense
		// In Express, a best practice for a simple catch-all is to hand
		// the error down to the default 500 error handler.
		// We do this below:
		if (err) return next(err);

		// Otherwise, everything is cool and we have the access token!		

		// We'll store this stuff in our session,
		// so we can keep track of it and prompt the user to reauthenticate
		// when the time comes
		req.session.deezer = {

			// We'll also want to get the lifespan
			// (0 === never expires)
			lifespan	: result.expires,

			// Save the access token in the session
			token		: result.accessToken,

			// Save the login time so we can keep track of time until expiration
			lastLogin	: new Date()
		};

		// Now that we're logged in, we can redirect to the "dashboard"
		// or whatever
		res.redirect('/dashboard');
	});
};



