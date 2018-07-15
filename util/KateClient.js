const { CommandoClient } = require('discord.js-commando');
const request            = require('snekfetch');
const Enmap = require('enmap');
const EnmapPGSql = require('enmap-pgsql');

new CommandoClient

module.exports = class KateClient extends CommandoClient {
  constructor(options) {
    super(options);
    this.enmapped = new Enmap({ 
      provider: new EnmapPGSql({
        name: 'settings',
        connectionString: process.env.DATABASE_URL
      })
    });
  }
  hastebin(input, extension) {
    return new Promise((res, rej) => {
      if (!input) rej("Input argument is required.");
      request.post("https://hastebin.com/documents").send(input).then(body => {
        res("https://hastebin.com/" + body.body.key + ((extension) ? "." + extension : ""));
      }).catch(e => rej(e));
    });
  }
}