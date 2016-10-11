var express = require('express');
var router = express.Router();

var appConfig = require('../web/crest-tq/app-config');
var authService = require('../web/crest-tq/auth/auth-service');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  // Create new auth service in session if it doesn't exist
  if (!req.session.authData) {
    req.session.authData = new authService.AuthData();
    req.session.save();
  }

  // Check if authenticated
  if (req.session.authData.authenticated) {

    // :thumbsup:
    res.render('index', { title: "Eve App" });

  } else {
    
    // Time to authenticate

    // Check if it's a redirect from eve login
    if (req.query.code && req.query.state) {

      // Got code and state, let's try to authenticate now
      authService.authenticate(req.session.authData, req.query.code, req.query.state).then(function () {

        // Should be good to go at this point
        res.redirect('/');

      })
      .catch(function (error) {

        // Authentication failed, one way or another. Kill session, send unauthorized response.
        console.log(error);
        req.session.destroy();
        res.status(401).send('Unauthorized');

      });
    } else { // (req.query.code && req.query.state)
      
      // No code/state? Redirect to Eve SSO to go get it.
      res.redirect(appConfig.genSsoUrl(req.session.authData.state));

    }

  }
});

/* GET logout */
router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
