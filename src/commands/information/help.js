import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } from 'discord.js';
import { readdirSync } from 'fs';
import getFiles from '../../lib/functions/getFiles.js';

const help = {
	data: new SlashCommandBuilder().setName('help').setDescription('help menu'),
	async run(client, interaction) {
		let folders = []
		readdirSync('src/commands').forEach(async (folder) => {
			folders.push(folder)
		});

		let helpRow = new MessageActionRow().addComponents([
			new MessageSelectMenu()
				.setCustomId(`help-row`)
				.setPlaceholder(`Commands`)
				.addOptions(folders.map(m => {
					return {
						label: `${m}`,
						description: `${m} commands`,
						value: m
					}
				})),
		]);

		await interaction.reply({
			embeds: [
				new MessageEmbed()
					.setTitle('Help Panel')
					.setDescription('In order to use the bot, use ``/`` commands.')
					.setColor('#384281'),
			],
			components: [helpRow],
			ephemeral: true,
		});
	},
};

export default help;
