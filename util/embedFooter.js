const meta = require('../package.json');

module.exports = () => {
  return `${process.env.name} v${meta.version} - By ${meta.author.name}`
}