const meta = require('../package.json');
const config = require('../config.json');

module.exports = () => {
  return `${config.discord.name} v${meta.version} - By ${meta.author.name}`
}