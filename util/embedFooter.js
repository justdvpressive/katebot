const meta = require('../package.json');
const config = require('../config.json');

module.exports = () => {
  return `${process.env.name} v${meta.version} - By ${meta.author.name}`
}