const {  Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const  EmbedFooter  = require('../../util/embedFooter');

module.exports = class HastebinCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'hastebin',
      group: 'dev',
      memberName: 'hastebin',
      description: 'Makes a new hastebin',
      args: [
        {
          key: 'content',
          prompt: 'What content should I put in the Hastebin?',
          type: 'string'
        }
      ]
    });
  }

  run(msg, { content }) {
    if(content.startsWith('```')) {
      var text = content.slice(3)
      var split = text.split('\n')
      if(split[0] != '') {
        split.pop()
        var ext = split.shift()
        this.client.hastebin(split.join('\n'), ext).then(res => {
          const embed = new RichEmbed({
            title: 'Hastebin created!',
            description: `View the hastebin [here](${res})`,
            footer: {
              icon_url: this.client.user.avatarURL,
              text: this.client.footer()
            },
            color: 0xFE5B35
          })

          msg.say({ embed })
        });
      } else {
        split.pop()
        split.shift()
        this.client.hastebin(split.join('\n'), 'txt').then(res => {
          const embed = new RichEmbed({
            title: 'Hastebin created!',
            description: `View the hastebin [here](${res})`,
            footer: {
              icon_url: this.client.user.avatarURL,
              text: this.client.footer()
            },
            color: 0xFE5B35
          })

          msg.say({ embed })
        });
      }
    } else {
      this.client.hastebin(content, 'txt').then(res => {
        const embed = new RichEmbed({
          title: 'Hastebin created!',
          description: `View the hastebin [here](${res})`,
          footer: {
            icon_url: this.client.user.avatarURL,
            text: this.client.footer()
          },
          color: 0xFE5B35
        })

        msg.say({ embed })
      });
    }
  }
};