const {  Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const    ReqProm    = require('request-promise');
const  EmbedFooter  = require('../../util/embedFooter');

module.exports = class GithubCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'github',
      group: 'dev',
      memberName: 'github',
      description: 'Fetches information from GitHub.',
      examples: ['github haydennyyy', 'github thecodesuite/ghapi'],
      args: [
        {
          key: 'expression',
          prompt: 'Enter the github expression (username(?/repo))',
          type: 'string'
        }
      ]
    });
  }

  run(msg, { expression }) {
    if(!expression.includes('/')) {
      ReqProm({
        uri: 'https://api.github.com/users/' + expression,
        headers: {
          'User-Agent': 'DiscordBot'
        },
        json: true
      }).then(user => {
        var embed = new RichEmbed()
          .setTitle(user.name)
          .setURL(user.html_url)
          .setThumbnail(user.avatar_url)
          .setColor('#FE5B35')
          .setFooter(this.client.footer(), this.client.user.avatarURL)
          .addField('Followers', user.followers, true)
          .addField('Gists', user.public_gists, true)
          .addField('Repos', user.public_repos, true);
          if(user.bio != null) embed.setDescription(user.bio)
          if(user.type == 'User')
            (user.company != null) ? 
              embed.addField('Company', user.company, true) : embed.addField('Company', 'None', true);

        msg.say({ embed });
      }).catch(error => {
        if(error.statusCode == 404) {
          var embed = new RichEmbed()
            .setTitle('GitHub')
            .setDescription('No such user or organisation found.')
            .setColor('#FE5B35')
            .setFooter(this.client.footer(), this.client.user.avatarURL);
          
          msg.say({ embed });
        } else {
          throw error;
        }
      })
    }
    else {
      ReqProm({
        uri: 'https://api.github.com/repos/' + expression,
        headers: {
          'User-Agent': 'DiscordBot'
        },
        json: true
      }).then(repo => {
        var embed = new RichEmbed()
          .setTitle(repo.name)
          .setURL(repo.html_url)
          .setDescription((repo.description != null) ? repo.description : 'None' )
          .setThumbnail(repo.owner.avatar_url)
          .setColor('#FE5B35')
          .setFooter(this.client.footer(), this.client.user.avatarURL)
          .addField('Language', (repo.language != null) ? repo.language : 'None' , true )
          .addField('License', (repo.license != null) ? repo.license.name : 'None', true )
          .addField('Size', repo.size, true)
          .addField('Topics', repo.topics, true)
          .addField('Forks, Stars & Watchers', `🍴: ${repo.forks_count}\n⭐: ${repo.stargazers_count}\n👁: ${repo.watchers_count}`);

        msg.say({ embed });
      }).catch(error => {
        if(error.statusCode == 404) {
          var embed = new RichEmbed()
            .setTitle('GitHub')
            .setDescription('No such repository.')
            .setColor('#FE5B35')
            .setFooter(this.client.footer(), this.client.user.avatarURL);
          
          msg.say({ embed });
        } else {
          throw error;
        }
      })
    }
  }
};