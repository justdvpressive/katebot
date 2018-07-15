const {  Command  } = require('discord.js-commando');
const Enmap = require('enmap');
const EnmapPGSql = require('enmap-pgsql');
const customs = new Enmap({ provider: new EnmapPGSql({ name: 'customs', connectionString: process.env.DATABASE_URL }) });


module.exports = class CustomCommandsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'custom',
      group: 'custom',
      memberName: 'custom',
      description: 'A custom command system!',
      args: [
        {
          key: 'method',
          prompt: 'What would you like to do? <make|edit|list>',
          type: 'string'
        },
        {
          key: 'title',
          prompt: 'What is the title of the command?',
          type: 'string',
          default: ''
        },
        {
          key: 'content',
          prompt: 'What would you like to do? <make|edit|list>',
          type: 'string',
          default: ''
        }
      ]
    });
  }

  run(msg, { method, title, content }) {
    switch(method) {
      case 'make' || 'new' || 'create':
        if(content == '') return msg.say('⚠ No content specified! ⚠')
        customs.set(title, content);
        break;
      
      case 'remove':
        if(content == '') return msg.say('⚠ No content specified! ⚠')
        try { customs.delete(title); } catch(err) { msg.say('An error occured: ' + err.message) }
        break;
      
      case 'list':
        console.log(customs.findAll(any, any));
        break;

      default:
        msg.say('Choose something to do!')
    }
  }
};