const {  Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const  EmbedFooter  = require('../../util/embedFooter');
const  ReqProm      = require('request-promise');
const  config       = require('../../config.json');

module.exports = class ShortenCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'shorten',
      group: 'util',
      memberName: 'shorten',
      description: 'Shortens a URL.',
      args: [
        {
          key: 'url',
          prompt: 'What URL would you like to shorten?',
          type: 'string'
        }
      ]
    });
  }

  run(msg, { url }) {
    ReqProm({
      method: 'POST',
      uri: 'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key='
        + config.google.firebaseApiKey.web,
      body: {
        longDynamicLink: 'https://katebot.page.link/?link=' + url,
        suffix: {
          option: 'SHORT'
        }
      },
      json: true
    }).then(body => {
      var embed = new RichEmbed()
        .setTitle('URL Shortened!')
        .setColor('#FE5B35')
        .setDescription(body.shortLink)
        .setFooter(EmbedFooter(), this.client.user.avatarURL);
      
      msg.say(embed);
    }).catch(error => {
      var embed = new RichEmbed()
        .setTitle('Uh-oh!')
        .setColor('#FE5B35')
        .setDescription('Something went wrong trying to shorten that link, sorry.')
        .setFooter(EmbedFooter(), this.client.user.avatarURL);
      
      msg.say(embed);
    })
    
  }
};