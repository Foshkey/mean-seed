var express = require('express');
var router = express.Router();

var charService = require('../crest/char/char-service');

router.get('/char', function (req, res, next) {
  if (req.session.charData) {
    res.json(charData);
  }
  else {
    charService.getChar(req.session.authData.accessToken).then(function (charData) {
      req.session.charData = charData;
      res.json(charData);
    }).catch(function (error) {
      console.log(error);
      var errRes = new Error('Could not find character');
      errRes.status = 500;
      next(errRes);
    })
  }
});

module.exports = router;