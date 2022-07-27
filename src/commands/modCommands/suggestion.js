import { SlashCommandBuilder } from '@discordjs/builders';
import { PermissionFlagsBits } from 'discord-api-types/v9';
import { MessageEmbed } from 'discord.js';
import Byte from '../../lib/classes/Byte.js';
import guildConfigSchema from '../../lib/models/guildConfigSchema.js';

const suggestion = {
	data: new SlashCommandBuilder()
		.setName('suggestion')
		.setDescription('Manage suggestions')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('accept')
				.setDescription('Accept any suggestion')
				.addStringOption((option) =>
					option
						.setName('message-id')
						.setDescription('The message ID of suggestion')
						.setRequired(true)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('deny')
				.setDescription('Deny any suggestion ')
				.addStringOption((option) =>
					option
						.setName('message-id')
						.setDescription('The message ID of the suggestion')
						.setRequired(true)
				)
				.addStringOption((option) =>
					option
						.setName('reason')
						.setDescription('The reason for denying this suggestion')
						.setRequired(false)
				)
		),
	settings: {
		devOnly: false,
	},
	/**
	 *
	 * @param {Byte} client
	 * @param {CommandInteraction} interaction
	 * @returns {Promise<*>}
	 */
	async run(client, interaction) {
		const subcommand = interaction.options.getSubcommand();

		if (subcommand === 'accept') {
			return acceptSuggestion(client, interaction);
		} else if (subcommand === 'deny') {
			return denySuggestion(client, interaction);
		}
	},
};

export default suggestion;

async function acceptSuggestion(client, interaction) {
	const messageId = interaction.options.getString('message-id');

	const configSchema = await guildConfigSchema.findOne({ guildId: interaction.guild.id });
	const { channelId: suggestionChannelId } = configSchema.suggestions;
	const suggestionChannel = await interaction.guild.channels.fetch(suggestionChannelId);

	const suggestionMsg = await suggestionChannel.messages.fetch(messageId);

	if (!suggestionMsg) {
		return client.sendError(
			interaction,
			'Invalid Message ID',
			'The message ID you provided is invalid!'
		);
	}
	const suggestionEmbed = suggestionMsg.embeds[0];

	const embed = new MessageEmbed()
		.setAuthor(suggestionEmbed.author)
		.setDescription(suggestionEmbed.description)
		.addFields([{ name: 'Status', value: '🟢 Accepted! The developers are working on it!' }])
		.setColor('GREEN')
		.setFooter({
			text: `Accepted by ${interaction.member.user.username}`,
			iconURL: interaction.member.user.displayAvatarURL({ dynamic: true }),
		});

	await suggestionMsg.edit({ embeds: [embed] });

	interaction.reply({
		embeds: [
			new MessageEmbed()
				.setTitle('Success!')
				.setDescription('The suggestion has been accepted!')
				.setColor('GREEN'),
		],
	});
}

async function denySuggestion(client, interaction) {
	const messageId = interaction.options.getString('message-id');
	const reason = interaction.options.getString('reason') || 'No reason provided';

	const configSchema = await guildConfigSchema.findOne({ guildId: interaction.guild.id });
	const { channelId: suggestionChannelId } = configSchema.suggestions;
	const suggestionChannel = await interaction.guild.channels.fetch(suggestionChannelId);

	const suggestionMsg = await suggestionChannel.messages.fetch(messageId);

	if (!suggestionMsg) {
		return client.sendError(
			interaction,
			'Invalid Message ID',
			'The message ID you provided is invalid!'
		);
	}

	const suggestionEmbed = suggestionMsg.embeds[0];

	const embed = new MessageEmbed()
		.setAuthor(suggestionEmbed.author)
		.setDescription(suggestionEmbed.description)
		.addFields([
			{
				name: 'Status',
				value: "🔴 Denied.. Thanks for suggesting but seems the community isn't intrested in it.",
			},
			{
				name: 'Reason',
				value: reason,
			},
		])
		.setColor('RED')
		.setFooter({
			text: `Denied by ${interaction.member.user.username}`,
			iconURL: interaction.member.user.displayAvatarURL({ dynamic: true }),
		});

	await suggestionMsg.edit({ embeds: [embed] });

	interaction.reply({
		embeds: [
			new MessageEmbed()
				.setTitle('Success!')
				.setDescription('The suggestion has been denied!')
				.setColor('GREEN'),
		],
	});
}
