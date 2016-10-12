let express = require('express');
let router = express.Router();

let charService = require('../web/crest-tq/char/char-service');

router.get('/char', (req, res, next) => {
  charService.getChar(req).then(charData => {
    res.json({
      CharacterID: charData.CharacterID,
      CharacterName: charData.CharacterName
    });
  }).catch(error => {
    console.log(error);
    let errRes = new Error('Could not find character');
    errRes.status = 500;
    next(errRes);
  })
});

router.post('/logout', (req, res, next) => {
  req.session.destroy();
  res.status(200).send();
});

module.exports = router;