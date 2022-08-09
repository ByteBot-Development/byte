import { SlashCommandBuilder } from '@discordjs/builders';

const ping = {
	data: new SlashCommandBuilder().setName('ping').setDescription('Returns bot ping.'),
	syntax: `/ping`,
	run(client, interaction) {
		interaction.reply(`Pong! ${client.ws.ping}ms api latency!`);
	},
};

export default ping;
