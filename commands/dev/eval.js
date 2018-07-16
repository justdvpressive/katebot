const {  Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class EvalCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'eval',
			group: 'dev',
			memberName: 'eval',
			description: 'Executes JavaScript code.',
			details: 'Only the bot owner(s) may use this command.',
			ownerOnly: true,

			args: [
				{
					key: 'script',
					prompt: 'What code would you like to evaluate?',
					type: 'string'
				}
			]
		});
	}

	run(msg, { script }) {
    try{
			const output = eval(script);
			var embed = new RichEmbed()
				.setTitle('Evaluate')
				.addField('Input:', '```js\n' + script + '\n```')
				.addField('Output:', '```js\n' + output + '\n```')
				.addField('Type:', '```js\n' + typeof output + '\n```')
				.setColor('#FE5B35')
				.setFooter(this.client.footer(), this.client.user.avatarURL);
				
			msg.say({embed});
		} catch(error) {
			var embed = new RichEmbed()
				.setTitle('Evaluate')
				.addField('Input:', '```js\n' + script + '\n```')
				.addField('Output:', '```js\n' + error + '\n```')
				.setColor('#FE5B35')
				.setFooter(this.client.footer(), this.client.user.avatarURL);
				
			msg.say({embed});
		}
  }
};
