require('dotenv').config()
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

bot.on('message', (message) => {
  if(message.author.bot) return;

  if(message.guild) {
    let key = `${message.guild.id}-${message.author.id}`;

    if(!bot.points.has(key)) {
      bot.points.set(key, {
        user: message.author.id,
        guild: message.guild.id,
        points: 0,
        level: 1
      });
    }
    let currentPoints = bot.points.getProp(key, 'points');
    bot.points.setProp(key, 'points', currentPoints + 1);
    const curLevel = Math.floor(0.1 * Math.sqrt(currentPoints));
    if (bot.points.getProp(key, "level") < curLevel) {
      message.reply(`You've leveled up to level **${curLevel}**! Great work!`);
      bot.points.setProp (key, "level", curLevel);
    }
  }
})

bot.registry
  .registerDefaultTypes()
  .registerDefaultGroups()
  .registerGroups([
    ['dev', 'Developer tools'],
    ['fun', 'Fun commands'],
    ['util', 'Utility commands'],
    ['points', 'Points-based commands'],
    ['admin', 'Administrative commands']
  ])
  .registerDefaultCommands({
    help: false,
    eval_: false
  })
  .registerCommandsIn(path.join(__dirname, 'commands'));

bot.login(process.env.token);