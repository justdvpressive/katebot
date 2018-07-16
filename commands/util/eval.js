const {  Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class EvalCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'eval',
			group: 'util',
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
    const output = eval(script);
    const embed = new RichEmbed()
      .setTitle('`eval`')
      .addField('Input:', '```js\n' + script + '\n```')
      .addField('Output:', '```js\n' + output + '\n```')
      .setColor('#FE5B35')
      .setFooter(this.client.footer(), this.client.user.avatarURL);
  }
};
