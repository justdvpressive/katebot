const { CommandoClient } = require('discord.js-commando');
const request            = require('snekfetch');
const meta               = require('../package.json');
const Enmap              = require('enmap');
const Provider           = require('enmap-pgsql');

module.exports = class KateClient extends CommandoClient {
  constructor(options) {
    super(options);
    this.points = new Enmap({provider: new Provider({name: 'points', connectionString: process.env.DATABASE_URL})});
  }
  /**
   * hastebin() - A function to create a hastebin
   *
   * @param {string} input The string to make up the body of the hastebin.
   * @param {string} extension The extension of the hastebin (js, html, css, etc.)
   * @returns
   */
  hastebin(input, extension) {
    return new Promise((res, rej) => {
      if (!input) rej("Input argument is required.");
      request.post("https://hastebin.com/documents").send(input).then(body => {
        res("https://hastebin.com/" + body.body.key + ((extension) ? "." + extension : ""));
      }).catch(e => rej(e));
    });
  }

  /**
   * footer() - A text footer for embeds.
   * 
   * @returns
   * @example
   * embed.setFooter(this.client.footer(), this.client.user.avatarURL);
   */
  footer() {
    return `${process.env.name} v${meta.version} - By ${meta.author.name}`
  }

  get version() {
    return `${meta.version}`
  }
}