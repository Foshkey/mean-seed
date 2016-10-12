let character = require('../comm/character');

class CharData {
  constructor() {
    this.CharacterID = 0;
    this.CharacterName = '';
    this.ExpiresOn = '';
    this.Scopes = '';
    this.TokenType = '';
    this.CharacterOwnerHash = '';
    this.IntellectualProperty = '';
  }
}

let getChar = req => {
  return new Promise((resolve, reject) => {
    if (req.session.charData) {
      resolve(req.session.charData);
    } else {
      character(req.session.authData.accessToken).then(charData => {
        // Quick check to ensure char id is there.
        if (charData.CharacterID) {
          req.session.charData = charData;
          resolve(charData);
        } else {
          reject('Could not find Character ID');
        }
      }).catch(error => {
        reject(error);
      })
    }
  });
}

module.exports = {
  CharData: CharData,
  getChar: getChar
}