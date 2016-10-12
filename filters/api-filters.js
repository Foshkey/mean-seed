let authenticationFilter = require('./security/authentication-filter.js');

module.exports = (req, res, next) => {

  let promiseChain = Promise.resolve()

  // Authentication
  .then(() => authenticationFilter(req))
  
  // All passed at this point
  .then(() => { next(); })

  // Catch any failures or rejects
  .catch(error => {
    console.log(error);
    req.session.destroy();
    res.redirect('/');
  });

}