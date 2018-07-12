const {  Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const  EmbedFooter  = require('../../util/embedFooter');

module.exports = class KissCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'kiss',
      group: 'emotes',
      memberName: 'kiss',
      description: 'A kiss emote!'
    });
  }

  run(msg) {
    const gifs = ['https://media.giphy.com/media/zkppEMFvRX5FC/giphy.gif', 'https://media.giphy.com/media/HSgkuMRab3fK8/giphy.gif', 'https://media.giphy.com/media/N3IuFaIanEs6I/giphy.gif'];
    msg.say({ embed: new RichEmbed({
      title: 'Kiss!',
      description: msg.mentions.users.first() + ', you\'ve been kissed by ' + msg.author + '!',
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