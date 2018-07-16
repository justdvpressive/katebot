const {  Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const  EmbedFooter  = require('../../util/embedFooter');

module.exports = class MemeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'meme',
      group: 'fun',
      memberName: 'meme',
      description: 'Gets a random meme!'
    });
  }

  run(msg) {
    this.client.meme().then(meme => {
      var embed = new RichEmbed({
        title: meme.caption,
        image: meme.image.normal,
        url: meme.link,
        footer: {
          text: EmbedFooter(),
          icon_url: this.client.user.avatarURL
        },
        color: 0xFE5B35
      })

      msg.say({embed});
    });
  }
};