let webRequest = require('../request');

module.exports = (characterNames = []) => {
  return new Promise((resolve, reject) => {

    if (!characterNames || characterNames.length === 0) {
      return resolve([]);
    }

    let querystringNames = characterNames.map(name => encodeURIComponent(name));

    let options = {
      host: 'api.eveonline.com',
      path: `/eve/CharacterID.xml.aspx?names=${querystringNames.join(',')}`,
      method: 'GET',
    };

    webRequest(options).then(result => {
      if (!result.eveapi || !result.eveapi.result || result.eveapi.result.length === 0) {
        reject('Could not find eve api result.');
      } else {
        let charIdList = [];
        let rowset = result.eveapi.result[0].rowset[0].row;
        rowset.forEach(row => {
          if (row.$.characterID !== '0') {
            charIdList.push({
              name: row.$.name,
              characterID: +row.$.characterID
            })
          }
        });
        resolve(charIdList);
      }
    }).catch(error => {
      reject(error);
    });
  });
}