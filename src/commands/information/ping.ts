import { SlashCommandBuilder } from '@discordjs/builders';
import { Command } from '../../lib/typings/CommandType';

const ping: Command = {
	data: new SlashCommandBuilder().setName('ping').setDescription('pong dude!'),
	settings: {
		devOnly: false,
	},
	run(client, interaction) {
		return interaction.reply('Hello!');
	},
};

export default ping;
