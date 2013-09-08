
/**
 * Middleware to ensure that the token is still cool
 * Protect Deezer API calls and any other internal routes
 *
 * Note: normally, you'd probably want to use your own authentication as well,
 * to keep track of users in your own database.
 * I'm glossing over this here to focus on demonstrating the usage 
 * of the raw `node-deezer` module.
 */

exports.checkToken = function(req, res, next) {

	console.log('Debug:: Checking Deezer token...', req.session.deezer);

	// If no Deezer session exists AT ALL, prompt authentication
	if (!req.session.deezer) {
		return res.redirect('/');
	}

	// If an access token exists, and `lifespan` is not set
	// we have perpetual access (offline_access), and so we're good!
	if (req.session.deezer.token && !req.session.deezer.lifespan) {
		return next();
	}

	// Get ms since last login
	var lastLogin = req.session.deezer.lastLogin;
	var msElapsed = (new Date() - lastLogin);
	var secondsElapsed = Math.ceil( (1.0 * msElapsed) / 1000 );

	// Calculate the # of seconds remaining before the token expires
	var secondsRemaining = req.session.deezer.lifespan - secondsElapsed;

	// If < 360 seconds remain (1 hour), we probably ought to request a fresh token
	var refreshThreshold = 360;
	if (secondsRemaining !== 0 &&
		secondsRemaining < refreshThreshold) {

		// The token has expired-- prompt user to reauthenticate
		return res.redirect('/');
	}


	// If we made it here, we're good!
	next();
};

