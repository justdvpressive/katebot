const {  Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const     fetch     = require('snekfetch');

const getAchievement = text => {
  return `https://www.minecraftskinstealer.com/achievement/a.php?i=20&h=Achievement+Get%21&t=${text.replace(/ /g, '+')}`;
}

module.exports = class AchieveCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'achieve',
      group: 'fun',
      memberName: 'achieve',
      description: 'Makes a Minecraft achievement banner.',
      args: [
        {
          key: 'text',
          prompt: 'What would you like to achieve?',
          type: 'text'
        }
      ]
    });
  }

  run(msg, { text }) {
    var embed = new RichEmbed()
      .setImage(getAchievement(text))
      .setColor('#FE5B35')
      .setFooter(this.client.footer(), this.client.user.avatarURL)
    
    msg.say({embed});
  }
};