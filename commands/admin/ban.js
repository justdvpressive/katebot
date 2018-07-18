const {  Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class BanCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ban',
      group: 'admin',
      memberName: 'ban',
      description: 'Bans a user.',
      args: [
        {
          key: 'user',
          prompt: 'Who are you banning?',
          type: 'user'
        },
        {
          key: 'reason',
          prompt: 'Why are you banning them?',
          type: 'string',
          default: ''
        },
        {
          key: 'time',
          prompt: 'How long are they to be banned from (in days)?',
          type: 'integer',
          default: ''
        }
      ],
      userPermissions: [
        'BAN_MEMBERS'
      ]
    });
  }

  run(msg, { user, reason, time }) {
    let options = {
      reason: (reason) ? reason : null,
      days: (time) ? time : null
    }
    msg.guild.ban(user, options)
      .then(user => {
        let embed = new RichEmbed()
          .setTitle('Banned')
          .setImage(user.avatarURL)
          .setDescription(`User \`${user.username}${user.discriminator}\` has been banned.`)
          .addField('Reason', (reason) ? reason : 'None', true)
          .addField('Duration', (time) ? time + ' days' : 'Forever', true)
          .setColor('#FB5E35')
          .setFooter(this.client.footer(), this.client.user.avatarURL);

        msg.say({embed});
      });
  }
};