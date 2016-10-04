var express = require('express');
var router = express.Router();

var appConfig = require('../auth/app-config');
var authService = require('../auth/auth-service');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.query.code || !req.query.state) {
    res.redirect(appConfig.ssoUrl);
  }
  else {
    authService.authenticate(req.query.code).then(function (data) {
      console.log(authService);
      res.json(data);
    }).catch(function (error) {
      console.log(error);
      res.json({});
    })
  }
  //res.render('index', { title: "MEAN App" });
});

module.exports = router;
