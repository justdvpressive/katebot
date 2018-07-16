const {  Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class ModuleCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'module',
      group: 'util',
      memberName: 'module',
      description: 'Gets a list of commands inside a module.',
      examples: ['module util', 'module fun'],
      args: [
        {
          key: 'module',
          prompt: 'What module should I look up?',
          type: 'string'
        }
      ],
      aliases: ['commands']
    });
  }

  run(msg, { module }) {
    var embed = new RichEmbed()
      .setTitle('Module: ' + module)
      .setColor('#FE5B35')
      .setFooter(this.client.footer(), this.client.user.avatarURL);
    const group = this.client.registry.findGroups(module, true)[0]
    if(group === undefined) {
      embed.setDescription('Module \`' + module + '\` does not exist.');
      msg.say({ embed });
    } else {
      var commands = []
      group.commands.array().forEach(command => {
        commands.push(command.name);
      });
      const commandList = commands.join('`, `');
      embed.setDescription(`\`${commandList}\``);
      msg.say({ embed });
    }
  }
};