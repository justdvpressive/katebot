const {  Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class RPSCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'rps',
      group: 'fun',
      memberName: 'rps',
      description: 'A rock-paper-scissors command'
    });
  }

  run(msg) {
    const returns = ['Rock', 'Paper', 'Scissors'];
    const randomAnswer = returns[Math.floor(Math.random() * returns.length)];

    var embed = new RichEmbed()
      .setTitle('RPS!')
      .setColor('FE5B35')
      .setDescription(randomAnswer)
      .setFooter(this.client.footer(), this.client.user.avatarURL);
    
    msg.say({ embed });
  }
};