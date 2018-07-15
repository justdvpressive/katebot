// This config.js file is used for Heroku.
// Learn more about this at https://devcenter.heroku.com/articles/config-vars,
// or you can set the values as strings.
module.exports = {
  discord: {
    token: process.env.token,
    prefix: process.env.prefix,
    owners: [process.env.owner],
    name: process.env.name
  },
  apiKeys: {
    firebase: process.env.firebaseApiKey
  }
}