const {  Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const  EmbedFooter  = require('../../util/embedFooter');

module.exports = class SlapCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'slap',
      group: 'emotes',
      memberName: 'slap',
      description: 'A slap emote!'
    });
  }

  run(msg) {
    const gifs = ['http://media.giphy.com/media/Zau0yrl17uzdK/giphy.gif', 'https://media.giphy.com/media/L7iHfUrBk3cqY/giphy.gif', 'https://media.giphy.com/media/VEmm8ngZxwJ9K/giphy.gif'];
    msg.say({ embed: new RichEmbed({
      title: 'Slap!',
      description: msg.mentions.users.first() + ', you\'ve been slapped by ' + msg.author + '!',
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