var { token, prefix, owner, name, firebaseApiKey } = process.env;

// This config.js file is used for Heroku.
// Learn more about this at https://devcenter.heroku.com/articles/config-vars,
// or you can set the values as strings.
module.exports = {
  discord: {
    token: token,
    prefix: prefix,
    owners: [owner],
    name: name
  },
  apiKeys: {
    firebase: firebaseApiKey
  }
}