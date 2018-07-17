const {  Command  } = require('discord.js-commando');

module.exports = class AwardCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'give',
      group: 'points',
      memberName: 'give',
      description: 'Gives a user a certain amount of points.',
      guildOnly: true,
      args: [
        {
          key: 'user',
          prompt: 'Mention the user you want to give points to',
          type: 'user'
        },
        {
          key: 'amount',
          prompt: 'How many points do you want to give?',
          type: 'number'
        }
      ]
    });
  }

  run(msg, { user, amount }) {
    const key = `${msg.guild.id}-${msg.author.id}`;
    const userKey = `${msg.guild.id}-${user.id}`;
    const curPoints = this.client.points.getProp()
    const userPoints = this.client.points.getProp(userKey, 'points');
    const userLevel = Math.floor(0.1 * Math.sqrt(curPoints));
    this.client.points.setProp(key, 'points', userPoints - amount);
    this.client.points.setProp(userKey, 'points', userPoints + amount);
    if (this.client.points.getProp(userKey, "level") < userLevel) {
      message.reply(`<@!${user.id}>, you've leveled up to level **${userLevel}**! Great work!`);
      this.client.points.setProp(userKey, "level", userLevel);
    }
    var embed = new RichEmbed()
      .setTitle('Points: ' + msg.author.username)
      .setDescription(`Gave ${amount} points to ${user}.`)
      .setColor('#FE5B35')
      .setFooter(this.client.footer(), this.client.user.avatarURL);

    msg.say({embed});
  }
};