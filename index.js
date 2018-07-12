const { CommandoClient } = require('discord.js-commando');
const config = require('./config.json');
const path = require('path');

const bot = new CommandoClient({
  commandPrefix: config.discord.prefix,
  owner: config.discord.owners,
  disableEveryone: true,
  unknownCommandResponse: false
});

bot.on('ready', () => {
  console.log('Ready!');
});

bot.registry
  .registerDefaultTypes()
  .registerGroups([
    ['dev', 'Developer tools'],
    ['fun', 'Fun commands'],
    ['util', 'Utility commands']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    help: false
  })
  .registerCommandsIn(path.join(__dirname, 'commands'));

bot.login(config.discord.token);