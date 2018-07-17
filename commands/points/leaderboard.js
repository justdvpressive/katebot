const {  Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class LeaderboardCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'leaderboard',
      group: 'points',
      memberName: 'leaderboard',
      description: 'Shows the top 10 members in the guild.',
      guildOnly: true
    });
  }

  run(msg) {
    const filtered = this.client.points.filterArray( p => p.guild === msg.guild.id );
    function compare(a,b) {
      if (a.points > b.points)
        return -1;
      if (a.points < b.points)
        return 1;
      return 0;
    }
    
    const sorted = filtered.sort(compare);
    const top10 = sorted.slice(0, 10);
    var list = '';
    var embed = new RichEmbed()
      .setTitle('Leaderboard for ' + msg.guild.name)
      .setColor('#FE5B35')
      .setFooter(this.client.footer(), this.client.user.avatarURL);
    
    top10.forEach((data, index) => {
      list += `**#${index + 1} ${this.client.users.get(data.user).tag}** - ${data.points} points (level ${data.level})\n`
    })

    embed.setDescription(list);

    return msg.say({embed});
  }
};