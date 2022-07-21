import { SlashCommandBuilder } from 'discord.js';
import { PermissionFlagsBits } from 'discord-api-types/v9';
import { EmbedBuilder } from 'discord.js';

const purge = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Delete a specific amount of messages at once.')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.addNumberOption((option) =>
			option.setName('amount').setDescription('The amount of messages to delete').setRequired(true)
		),
	settings: {
		devOnly: false,
	},

	async run(client, interaction) {
		const amount = interaction.options.getNumber('amount');

		if (amount > 100) {
			return client.sendError(
				interaction,
				'Invalid Amount!',
				'You are not allowed to delete more than 100 message at once!'
			);
		}

		interaction.channel.bulkDelete(amount, true).then(() =>
			interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setTitle('Success!')
						.setDescription(`Successfully deleted ${amount} messages!`),
				],
				ephemeral: true,
			})
		);
	},
};

export default purge;
