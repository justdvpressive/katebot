const {  Command  } = require('discord.js-commando');
const  EmbedFooter  = require('../../util/embedFooter');

module.exports = class SnippetCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'snippets',
      group: 'dev',
      memberName: 'snippets',
      description: 'Snippets command!',
      args: [
        {
          key: 'method',
          prompt: '<get|remove|new|edit>',
          type: 'string'
        },
        {
          key: 'title',
          prompt: 'Title of the snippet',
          type: 'string'
        },
        {
          key: 'content',
          prompt: 'Content of the snippet',
          type: 'string',
          default: ''
        },
      ]
    });
  }

  run(msg, { method, title, content }) {
    switch(method) {
      case 'get':
        const snip = this.client.settings.get(msg.guild, title);
        msg.say({ embed: {
          title: `\`${title}\``,
          description: (!snip.beginsWith('```')) ? '```' + snip + '```' : snip,
          footer: {
            icon: this.client.user.avatarURL,
            text: EmbedFooter()
          },
          color: 0xFE5B35
        } })
        break;
      case 'new':
        /* **Example of a snippet key**
          'snippet-example': '```\nMeep!\n```'
        */
        this.client.settings.set(msg.guild, 'snippet-' + title, content);
        msg.say({ embed: {
          title: 'Snippet created!',
          description: 'Snippet made with the title of `' + title + '`.',
          footer: {
            icon: this.client.user.avatarURL,
            text: EmbedFooter()
          },
          color: 0xFE5B35
        }})
    }
  }
};