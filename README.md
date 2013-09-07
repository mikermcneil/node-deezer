node-deezer
===========

Unofficial Node.js wrapper for the Deezer API



## How To Build a Deezer App

+ Create your app on developers.deezer.com
	+ Set application domain to `localhost` for now
	+ Grab the `Application ID` and `Secret Key`

+ 2) Build your Deezer login flow
	+ You must pop up an OAuth window (or redirect, or use an iframe) to acquire an access token for the user whose account your app will access
	+ The `callback url` you specify on developers.deezer.com will be accessed from Deezer's end when the login is complete.

```
// OAuth endpoint:
https://connect.deezer.com/oauth/auth.php?app_id=YOUR_APP_ID&redirect_uri=YOUR_REDIRECT_URI&perms=basic_access,email
```