var promise = require('promise');

var authenticationFilter = require('./security/authentication-filter.js');

module.exports = function (req, res, next) {

  var promiseChain = promise.resolve()

  // Authentication
  .then(function () { return authenticationFilter(req) })
  
  // All passed at this point
  .then(function () { next(); })

  // Catch any failures or rejects
  .catch(function (error) {
    console.log(error);
    req.session.destroy();
    res.redirect('/');
  });

}