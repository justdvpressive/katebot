const {  Command  } = require('discord.js-commando');

module.exports = class EscapeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'escape',
      group: 'dev',
      memberName: 'escape',
      description: 'Escapes a string into a URL-compatible one.',
      examples: ['escape Hello World!', 'escape this is text to be ESCAPED!?! WOWIE!(£&$&'],
      args: [
        {
          key: 'escapee',
          prompt: 'What text would you like to escape?',
          type: 'string'
        }
      ]
    });
  }

  run(msg, { escapee }) {
    msg.say('\`' + escape(escapee) + '\`');
  }
};