import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import { promisify } from 'util';
import { Command } from '../../lib/typings/CommandType';

const help: Command = {
	data: new SlashCommandBuilder().setName('help').setDescription('help menu'),
	settings: {
		devOnly: false,
	},
	async run(client, interaction) {
		try {
			const row = new MessageActionRow().addComponents(
				new MessageButton().setCustomId('Main').setLabel('Info Commands').setStyle('PRIMARY'),
				new MessageButton().setCustomId('Mod').setLabel('Moderation Commands').setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('Config')
					.setLabel('Configuation Commands')
					.setStyle('PRIMARY')
			);
			const row2 = new MessageActionRow().addComponents(
				new MessageButton().setCustomId('Back').setLabel('back').setStyle('PRIMARY')
			);

			const HelpEmbed = new MessageEmbed()
				.setTitle('``Help Panel``')
				.setDescription('In order to use the bot, use the prefix ``-`` to use any commands.')
				.setColor('#384281');

			await interaction.reply({
				embeds: [HelpEmbed],
				components: [row],
				ephemeral: true,
			});
			// interactionchannel.send({ embeds: [HelpEmbed], components: [row],  ephemeral: true})

			client.on('interactionCreate', async (ButtonInteraction, interaction, message) => {
				if (!ButtonInteraction.isButton()) return;

				// await ButtonInteraction.deferUpdate()

		} catch (err) {
			return;
		}
	},
};

export default help;
