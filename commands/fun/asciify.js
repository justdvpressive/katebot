const { Command } = require('discord.js-commando');
const figlet      = require('figlet');

module.exports = class AsciifyCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'asciify',
      group: 'fun',
      memberName: 'asciify',
      description: 'Turns text into ascii art!',
      args: [
        {
          key: 'text',
          prompt: 'What text would you like to \'asciify\'?',
          type: 'string'
        }
      ]
    });
  }

  run(msg, {text}) {
    figlet(text, {}, (err, data) => {
      if(err) return console.error(err);
      msg.say(`\`\`\`\n${data}\n\`\`\``);
    });
  }
};