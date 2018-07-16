const {  Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class PointsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'points',
      group: 'points',
      memberName: 'points',
      description: 'A command to show how many points you have.',
      args: [
        {
          key: 'user',
          prompt: 'Whose points would you like to see?',
          type: 'user',
          default: ''
        }
      ],
      guildOnly: true
    });
  }

  run(msg, {user}) {
    if(user == '') {
      const key = `${msg.guild.id}-${msg.author.id}`;
      const curPoints = this.client.points.getProp(key, 'points');
      const curLevel = Math.floor(0.1 * Math.sqrt(curPoints));
      var embed = new RichEmbed()
        .setTitle('Points: ' + msg.author.username)
        .addField('Points', curPoints, true)
        .addField('Level', curLevel, true)
        .setColor('#FE5B35')
        .setFooter(this.client.footer(), this.client.user.avatarURL);

      msg.say({embed});
    }
  }
};