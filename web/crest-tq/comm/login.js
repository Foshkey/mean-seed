let appConfig = require('../app-config');
let webRequest = require('../../request');

module.exports = postData => {

  // Options
  let options = {
      host: 'login.eveonline.com',
      path: '/oauth/token',
      method: 'POST',
      headers: {
        'Authorization': `Basic ${appConfig.authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
  };

  return webRequest(options, postData);
}