var express = require('express');
var router = express.Router();

var charService = require('../crest/char/char-service');

router.get('/char', function (req, res, next) {
  charService.getChar(req).then(function (charData) {
    res.json({
      CharacterID: charData.CharacterID,
      CharacterName: charData.CharacterName
    });
  }).catch(function (error) {
    console.log(error);
    var errRes = new Error('Could not find character');
    errRes.status = 500;
    next(errRes);
  })
});

router.post('/logout', function (req, res, next) {
  req.session.destroy();
  res.status(200).send();
});

module.exports = router;