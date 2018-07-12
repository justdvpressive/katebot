const {  Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const  EmbedFooter  = require('../../util/embedFooter');

module.exports = class HugCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'hug',
      group: 'emotes',
      memberName: 'hug',
      description: 'A hug emote!'
    });
  }

  run(msg) {
    const gifs = ['https://media.giphy.com/media/3bqtLDeiDtwhq/giphy.gif', 'https://media.giphy.com/media/143v0Z4767T15e/giphy.gif', 'http://media.giphy.com/media/lrr9rHuoJOE0w/giphy.gif'];
    msg.say({ embed: new RichEmbed({
      title: 'Hug!',
      description: msg.mentions.users.first() + ', you\'ve been hugged by ' + msg.author + '!',
      image: {
        url: gifs[Math.floor(Math.random() * gifs.length)]
      },
      color: 0xFE5B35,
      footer: {
        icon_url: this.client.user.avatarURL,
        text: EmbedFooter()
      }
    }) })
  }
};