const {  Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const    PkgInfo    = require('../../package.json');

module.exports = class InfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'info',
      group: 'dev',
      memberName: 'botinfo',
      description: 'Returns data about the bot.',
      aliases: ['info', 'bi']
    });
  }

  run(msg) {
    var embed = new RichEmbed()
      .setTitle('Bot Info')
      .addField('Version', PkgInfo.version, true)
      .addField('Author', PkgInfo.author.name, true)
      .addField('Source', `[Repository](${PkgInfo.repository})`, true)
      .addField('License', PkgInfo.license, true)
      .addField('Name', this.client.user.username, true)
      .setThumbnail(this.client.user.avatarURL)
      .setColor('#FE5B35')
      .setFooter(this.client.footer(), this.client.user.avatarURL);

    msg.say({embed});
  }
};