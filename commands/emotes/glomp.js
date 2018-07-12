const {  Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const  EmbedFooter  = require('../../util/embedFooter');

module.exports = class GlompCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'glomp',
      group: 'emotes',
      memberName: 'glomp',
      description: 'A glomp emote!'
    });
  }

  run(msg) {
    const gifs = ['https://media.giphy.com/media/3o7bu1VPknlh0XaDhC/giphy.gif', 'https://media.giphy.com/media/zXw3Qu30tLqiA/giphy.gif', 'https://thumbs.gfycat.com/GrimCheerfulImperialeagle-size_restricted.gif'];
    msg.say({ embed: new RichEmbed({
      title: 'Glomp!',
      description: msg.mentions.users.first() + ', you\'ve been glomped by ' + msg.author + '!',
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