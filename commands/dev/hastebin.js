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
          key: 'ext',
          prompt: 'What extension is this code?',
          type: 'string'
        },
        {
          key: 'content',
          prompt: 'What content should I put in the Hastebin?',
          type: 'string'
        }
      ]
    });
  }

  run(msg, { ext, content }) {
    this.client.hastebin(content, ext).then(res => msg.say(res));
  }
};