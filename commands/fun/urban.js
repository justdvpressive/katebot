const {  Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const  EmbedFooter  = require('../../util/embedFooter');
const    ReqProm    = require('request-promise');

module.exports = class UrbanCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'urban',
      group: 'fun',
      memberName: 'urban',
      description: 'Gets a definition from Urban Dictionary.',
      examples: ['urban', 'urban Retard', 'urban ur family tree lgbt'],
      args: [
        {
          key: 'searchTerm',
          prompt: 'What would you like to define?',
          type: 'string',
          default: ''
        }
      ]
    });
  }

  run(msg, { searchTerm }) {
    if(searchTerm == '') {
      // Handle random defs
      ReqProm({
        uri: 'https://api.urbandictionary.com/v0/random',
        headers: { 'User-Agent': 'DiscordBot' },
        json: true
      }).then(definitions => {
        const definition = definitions.list[0];
        var embed = new RichEmbed()
          .setTitle(definition.word)
          .setAuthor('By ' + definition.author)
          .setURL(definition.permalink)
          .setColor('#FE5B35')
          .setFooter(EmbedFooter(), this.client.user.avatarURL)
          .addField('Definition', definition.definition)
          .addField('Example', definition.example)
          .addField('\u200b', '👍 ' + definition.thumbs_up, true)
          .addField('\u200b', '👎 ' + definition.thumbs_down, true)
        
        msg.say({ embed });
      })
    } else {
      ReqProm({
        uri: 'https://api.urbandictionary.com/v0/define?term=' + searchTerm,
        headers: { 'User-Agent': 'DiscordBot' },
        json: true
      }).then(definitions => {
        const definition = definitions.list[0];
        var embed = new RichEmbed()
          .setTitle(definition.word)
          .setAuthor('By ' + definition.author)
          .setURL(definition.permalink)
          .setColor('#FE5B35')
          .setFooter(EmbedFooter(), this.client.user.avatarURL)
          .addField('Definition', definition.definition)
          .addField('Example', definition.example)
          .addField('\u200b', '👍 ' + definition.thumbs_up, true)
          .addField('\u200b', '👎 ' + definition.thumbs_down, true)
        
        msg.say({ embed });
      }).catch(error => {
        console.log(error);
        var embed = new RichEmbed()
          .setTitle('Urban Dictionary')
          .setDescription('No results were found.')
          .setColor('#FE5B35')
          .setFooter(EmbedFooter(), this.client.user.avatarURL)
        
        msg.say({ embed });
      })
    }
  }
};