const {  Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const  EmbedFooter  = require('../../util/embedFooter');

module.exports = class SuggestCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'suggest',
      group: 'util',
      memberName: 'suggest',
      description: 'Sends a suggestion to a channel called #suggestions',
      args: [
        {
          key: 'suggestion',
          prompt: 'What would you like to suggest?',
          type: 'string'
        }
      ]
    });
  }

  run(msg, { suggestion }) {
    var embed = new RichEmbed()
      .setTitle('Suggestion!')
      .setAuthor('By ' + msg.author.username)
      .setColor('#FE5B35')
      .setDescription(suggestion)
      .setFooter(EmbedFooter(), this.client.user.avatarURL)
      .setTimestamp(new Date().now);
    
    const channel = this.client.channels.find('name', 'suggestions')
    channel.send({ embed }).then(message => {
      message.react('👍');
      message.react('👎');
    });
  }
};