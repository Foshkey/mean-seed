var authenticationFilter = require('./security/authentication-filter.js');

module.exports = function (req, res, next) {

  // Authentication
  authenticationFilter(req).then(function () {
    next();
  }).catch(function (error) {
    console.log(error);
    req.session.destroy();
    res.redirect('/');
  });

}