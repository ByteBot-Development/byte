import { SlashCommandBuilder } from '@discordjs/builders';

const ping = {
	data: new SlashCommandBuilder().setName('ping').setDescription('pong dude!'),
	run(client, interaction) {
		interaction.reply('Hello!');
	},
};

export default ping;
