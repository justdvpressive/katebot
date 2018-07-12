const {  Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const  EmbedFooter  = require('../../util/embedFooter');

module.exports = class SetAvatarCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'setavatar',
      group: 'util',
      memberName: 'setavatar',
      description: 'Sets the avatar to the specified URL.',
      ownerOnly: true,
      args: [
        {
          key: 'url',
          prompt: 'What URL should I change my avatar to match?',
          type: 'string'
        }
      ]
    });
  }

  run(msg, { url }) {
    this.client.user.setAvatar(url);
    var embed = new RichEmbed()
      .setTitle('Avatar changed!')
      .setColor('#FB5E35')
      .setImage(url)
      .setFooter(EmbedFooter(), this.client.user.avatarURL);

    msg.say({ embed });
  }
};