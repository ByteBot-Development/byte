import { SlashCommandBuilder } from 'discord.js';

const ping = {
	data: new SlashCommandBuilder().setName('ping').setDescription('pong dude!'),
	run(client, interaction) {
		interaction.reply('Hello!');
	},
};

export default ping;
