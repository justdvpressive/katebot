const {  Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class AwardCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'award',
      group: 'points',
      memberName: 'award',
      description: 'Awards a user a certain amount of points.',
      guildOnly: true,
      ownerOnly: true,
      args: [
        {
          key: 'user',
          prompt: 'Mention the user you want to award points to',
          type: 'user'
        },
        {
          key: 'amount',
          prompt: 'How many points do you want to award?',
          type: 'integer'
        }
      ]
    });
  }

  run(msg, { user, amount }) {
    const key = `${msg.guild.id}-${user.id}`;
    const userPoints = this.client.points.getProp(key, 'points');
    const userLevel = Math.floor(0.1 * Math.sqrt(userPoints));
    this.client.points.setProp(key, 'points', userPoints + amount);
    if (this.client.points.getProp(key, "level") < userLevel) {
      message.reply(`<@!${user.id}>, you've leveled up to level **${userLevel}**! Great work!`);
      this.client.points.setProp(key, "level", userLevel);
    }
    var embed = new RichEmbed()
      .setTitle('Points: ' + msg.author.username)
      .setDescription(`Added ${amount} points to ${user}.`)
      .setColor('#FE5B35')
      .setFooter(this.client.footer(), this.client.user.avatarURL);

    msg.say({embed});
  }
};