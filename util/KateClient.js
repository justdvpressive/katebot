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

  /**
   * meme() - Returns a meme object from 9GAG.
   *
   * @returns {Promise} Meme object
   * @example
   * this.client.meme().images.normal // http://img-9gag-fun.9cache.com/photo/EyVtjpq_460s.jpg
   */
  meme() {
    return new Promise((res, rej) => {
      request.get('http://infinigag.k3min.eu/funny/hot').then(body => {
        res(body.data[Math.floor(Math.random() * body.data.length)]);
      }).catch(e => rej(e));
    })
  }
}