const {  Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const  EmbedFooter  = require('../../util/embedFooter');

module.exports = class modulesCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'modules',
      group: 'util',
      memberName: 'modules',
      description: 'Returns a list of modules.',
      examples: ['modules']
    });
  }

  run(msg) {
    var embed = new RichEmbed()
      .setTitle('Modules')
      .setColor('#FE5B35')
      .setFooter(EmbedFooter(), this.client.user.avatarURL);
    var groups = []
    this.client.registry.groups.forEach(group => {
      groups.push(group.id);
    })
    const groupsList = groups.join('`, `');
    embed.setDescription(`\`${groupsList}\``);
    msg.say({ embed });
  }
};