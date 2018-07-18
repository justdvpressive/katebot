const {  Command  } = require('discord.js-commando');

module.exports = class PurgeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'purge',
      group: 'util',
      memberName: 'purge',
      description: 'Deletes a given number of messages from a channel.',
      userPermissions: [
        'MANAGE_MESSAGES'
      ],
      args: [
        {
          key: 'number',
          prompt: 'How many messages should I delete?',
          type: 'integer',
          default: ''
        },
        {
          key: 'user',
          prompt: 'Whose messages shall I delete?',
          type: 'user',
          default: ''
        },
      ]
    });
  }

  run(msg, { number, user }) {
    if(user === '') {
      msg.channel.fetchMessages({ limit: number || 100 })
        .then(msgs => {
          msgs.forEach(message => {
            message.delete();
          });
        });
      msg.delete();
    } else {
      for(i = number; i < number; i++) {
        if(user.lastMessage.channel.id === msg.channel.id) {
          user.lastMessage.delete();
        } else {
          i--;
        };
      }
    }
  }
};