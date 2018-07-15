const Kate = require('./util/KateClient');
const path = require('path');
const pkgcnf = require('./package.json');

const bot = new Kate({
  commandPrefix: process.env.prefix,
  owner: [ process.env.owner ],
  disableEveryone: true,
  unknownCommandResponse: false,
  ignoreSelf: false
});

bot.on('ready', () => {
  console.log('Ready!');
  bot.user.setActivity(`${bot.commandPrefix}help | ${pkgcnf.version} by ${pkgcnf.author.name}`, { url: 'https://kate.js.org' });
  bot.user.setUsername(process.env.name);
});

bot.registry
  .registerDefaultTypes()
  .registerGroups([
    ['dev', 'Developer tools'],
    ['fun', 'Fun commands'],
    ['util', 'Utility commands'],
    ['custom', 'Custom commands']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    help: false
  })
  .registerCommandsIn(path.join(__dirname, 'commands'));

bot.login(process.env.token);