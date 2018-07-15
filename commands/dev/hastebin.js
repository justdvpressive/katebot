const {  Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const  EmbedFooter  = require('../../util/embedFooter');

module.exports = class HastebinCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'hastebin',
      group: 'dev',
      memberName: 'hastebin',
      description: 'Makes a new hastebin',
      args: [
        {
          key: 'content',
          prompt: 'What content should I put in the Hastebin?',
          type: 'string'
        }
      ]
    });
  }

  run(msg, { content }) {
    if(content.startsWith('```')) {
      var text = content.slice(3)
      if(text.split('\n')[0] != '') {
        text.pop()
        var ext = text.shift()
        this.client.hastebin(text, ext).then(res => msg.say(res));
      } else {
        text.pop()
        text.shift()
        this.client.hastebin(content, 'txt').then(res => msg.say(res));
      }
    } else {
      this.client.hastebin(content, 'txt').then(res => msg.say(res));
    }
  }
};