const { CommandoClient } = require('discord.js-commando');
const request            = require('snekfetch');

module.exports = class KateClient extends CommandoClient {
  hastebin(input, extension) {
    return new Promise((res, rej) => {
      if (!input) rej("Input argument is required.");
      request.post("https://hastebin.com/documents").send(input).then(body => {
        res("https://hastebin.com/" + body.body.key + ((extension) ? "." + extension : ""));
      }).catch(e => rej(e));
    });
  }
}