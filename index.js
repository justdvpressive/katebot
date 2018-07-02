const { Client } = require('discord.js');
const path       = require('path');
const logger    = require('./winstonConfig');
const config     = require('./config.json');

const bot = new Client();

bot.on('ready', () => {
  logger.info(`Bot(${bot.user.id}) ready.`);
});

bot.login(config.discord.token);