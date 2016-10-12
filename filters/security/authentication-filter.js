let authService = require('../../web/crest-tq/auth/auth-service');

module.exports = req => {
  return new Promise((resolve, reject) => {
    let authData = req.session.authData;
    if (!authData || !authData.authenticated || !authData.accessToken || !authData.refreshToken) {
      reject('Authentication data is not valid');
    }
    if (authService.isExpired(authData)) {
      authService.refresh(authData).then(resolve, reject);
    } else {
      resolve();
    }
  });
}