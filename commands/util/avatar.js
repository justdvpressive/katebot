const {  Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const  EmbedFooter  = require('../../util/embedFooter');

module.exports = class AvatarCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'avatar',
      group: 'util',
      memberName: 'avatar',
      description: 'Gets a user\'s avatar.',
      args: [
        {
          key: 'user',
          prompt: 'What user would you like to retrieve the avatar for?',
          type: 'user',
          default: ''
        }
      ]
    });
  }

  run(msg, { user }) {
    if(user == '') { 
      const avatar = msg.author.avatarURL;
      var   embed  = new RichEmbed()
        .setTitle('Avatar: ' + msg.author.username)
        .setColor('#FE5B35')
        .setImage(avatar)
        .setFooter(this.client.footer(), this.client.user.avatarURL);

      msg.say({embed});
    } else {
      const avatar = user.avatarURL;
      var   embed  = new RichEmbed()
        .setTitle('Avatar: ' + user.username)
        .setColor('#FE5B35')
        .setImage(avatar)
        .setFooter(this.client.footer(), this.client.user.avatarURL);

      msg.say({embed});
    }
  }
};