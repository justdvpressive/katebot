const { CommandoClient } = require('discord.js-commando');
const config = require('./config.js');
const path = require('path');
const pkgcnf = require('./package.json');

const bot = new CommandoClient({
  commandPrefix: config.discord.prefix,
  owner: config.discord.owners,
  disableEveryone: true,
  unknownCommandResponse: false
});

bot.on('ready', () => {
  console.log('Ready!');
  bot.user.setActivity(`${bot.commandPrefix}help | ${pkgcnf.version} by ${pkgcnf.author.name}`, { url: 'https://kate.js.org' });
  bot.user.setUsername(config.discord.name);
});

bot.registry
  .registerDefaultTypes()
  .registerGroups([
    ['dev', 'Developer tools'],
    ['fun', 'Fun commands'],
    ['util', 'Utility commands'],
    ['emotes', 'Emote commands']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    help: false
  })
  .registerCommandsIn(path.join(__dirname, 'commands'));

bot.login(config.discord.token);