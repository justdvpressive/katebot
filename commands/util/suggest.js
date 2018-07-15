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

  async run(msg, { suggestion }) {
    var embed = new RichEmbed()
      .setTitle('Suggestion!')
      .setAuthor('By ' + msg.author.username)
      .setColor('#FE5B35')
      .setDescription(suggestion)
      .setFooter(EmbedFooter(), this.client.user.avatarURL)
      .setTimestamp(new Date().now);
    
    const channel = await msg.guild.channels.find('name', 'suggestions');
    if(!channel) return msg.say('**Please create a channel called `suggestions` to use this command!**');
    else channel.send({ embed }).then(message => {
      message.react('👍');
      message.react('👎');
    });
  }
};