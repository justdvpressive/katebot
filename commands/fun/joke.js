const {  Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const  EmbedFooter  = require('../../util/embedFooter');
const    ReqProm    = require('request-promise');

module.exports = class JokeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'joke',
      group: 'fun',
      memberName: 'joke',
      description: 'Gets a random joke from Reddit.',
      examples: ['joke']
    });
  }

  run(msg) {
    ReqProm({
      uri: 'https://reddit.com/r/jokes.json',
      headers: { 'User-Agent': 'DiscordBot' },
      json: true
    }).then(jokes => {
      const joke = jokes.data.children[Math.floor(Math.random() * jokes.data.children.length)].data;
      var embed = new RichEmbed()
        .setTitle(joke.title)
        .setURL(joke.url)
        .setColor('#FE5B35')
        .setFooter(this.client.footer(), this.client.user.avatarURL)
        .setDescription(joke.selftext)
        .addField('\u200b', '👍 ' + joke.ups, true)
        .addField('\u200b', '👎 ' + joke.downs, true)
      
      msg.say({ embed });
    })
  }
};