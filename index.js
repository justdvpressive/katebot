const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const pkgcnf = require('./package.json');
const Mongo = require('mongodb').MongoClient;
const MongoProvider = require('commando-provider-mongo');

const bot = new CommandoClient({
  commandPrefix: process.env.prefix,
  owner: [ process.env.owner ],
  disableEveryone: true,
  unknownCommandResponse: false
});

bot.setProvider(
  Mongo.connect('mongodb://kate:' + process.env.MongoPassword + '@haydenbjyoung.me:katebot');
)

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
    ['emotes', 'Emote commands']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    help: false
  })
  .registerCommandsIn(path.join(__dirname, 'commands'));

bot.login(process.env.token);