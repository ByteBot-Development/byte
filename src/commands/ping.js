import { SlashCommandBuilder } from '@discordjs/builders';

export const ping = {
	data: new SlashCommandBuilder().setName('ping').setDescription('pong dude!'),
	run(client, interaction) {
		interaction.reply('Hello!');
	},
};
