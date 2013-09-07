/**
 * Module dependencies
 */


/**
 *
 */

module.exports = Authenticator;


function Authenticator () {



	var appId = 'TODO';
	var redirectUrl = 'http://localhost:1337';

	// Build set of parameters to send to the authentication endpoint
	// to verify that the user whose account you'd like to access
	// is on board and cool w/ it and everything
	var params = {
		app_id: appId,
		redirect_uri: redirectUrl
	};



	/**
	 *
	 */

	this.generateLoginUrl = function () {

	};



	/**
	 * Available Permissions:
	 * (as of Saturday, Sep 7, 2013)
	 * (from http://developers.deezer.com/api/permissions)
	 *
	 * basic_access
	 * email
	 * offline_access
	 * manage_library
	 * manage_community
	 * delete_library
	 * listening_history
	 */

}