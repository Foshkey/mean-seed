let express = require('express');
let router = express.Router();

let appConfig = require('../web/crest-tq/app-config');
let authService = require('../web/crest-tq/auth/auth-service');
let charIds = require('../web/eve-api/character-ids');
let logger = require('../logger');

/* GET home page. */
router.get('/', (req, res, next) => {
  
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
      authService.authenticate(req.session.authData, req.query.code, req.query.state).then(() => {

        // Should be good to go at this point
        res.redirect('/');

      })
      .catch(error => {

        // Authentication failed, one way or another. Kill session, send unauthorized response.
        logger.error(error);
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
router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
