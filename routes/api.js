var express = require('express');
var router = express.Router();

router.get('/user', function (req, res, next) {
  res.json({ user: { name: 'testUser' } })
});

module.exports = router;