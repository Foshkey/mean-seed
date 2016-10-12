let webRequest = require('../../request');

module.exports = accessToken => {

  // Options
  let options = {
      host: 'login.eveonline.com',
      path: '/oauth/verify',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
  };

  return webRequest(options);
}