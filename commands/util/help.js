const {  Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const  EmbedFooter  = require('../../util/embedFooter');

module.exports = class HelpCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'help',
      group: 'util',
      memberName: 'help',
      description: 'Replies with a Message.',
      examples: ['help', 'help avatar'],
      args: [
        {
          key: 'command',
          prompt: 'What command would you like to find information for?',
          type: 'string',
          default: ''
        }
      ]
    });
  }

  run(msg, { command }) {
    if(command == '') {
      var embed = new RichEmbed()
        .setDescription(`***Katebot v0.1.0***\nInvite me to your server here!\n>>> https://discordapp.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=0&scope=bot <<<\n\nYou can use \`${this.client.commandPrefix}modules\` to get a list of modules.\nYou can use \`${this.client.commandPrefix}commands moduleName\` to get a list of commands in that module.\nYou can use \`${this.client.commandPrefix}help CommandName\` to find detailed information about a command.`)
        .setFooter(EmbedFooter(), this.client.user.avatarURL)
        .setColor('#FE5B35');

      msg.say({ embed });
    } else {
      this.client.registry.findCommands(command, true).forEach(cmd => {
        var embed = new RichEmbed()
          .setTitle(`\`${cmd.group.name}:${cmd.name}\``)
          .addField('Group', '\`' + cmd.groupID + '\`',true)
          .addField('Examples', (cmd.examples == null) ? 'None' : cmd.examples, true)
          .addField('Usage', `\`${this.client.commandPrefix}${cmd.name} ${cmd.format}\``, true)
          .addField('Description', cmd.description)
          .setColor('#FE5B35');

        msg.say({ embed });
      })
    }
  }
};