const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const pkgcnf = require('./package.json');
const MongoClient = require('mongodb').MongoClient;
const MongoDBProvider = require('commando-provider-mongo');

const bot = new CommandoClient({
  commandPrefix: process.env.prefix,
  owner: [ process.env.owner ],
  disableEveryone: true,
  unknownCommandResponse: false
});

bot.setProvider(
	MongoClient.connect(`mongodb://kate:${process.env.MongoPassword}@haydenbjyoung.me:27017`).then(client => new MongoDBProvider(client.db('kate')))
).catch(console.error);

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