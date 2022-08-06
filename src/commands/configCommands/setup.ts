import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbed, Permissions } from 'discord.js';
import Byte from '../../lib/classes/Byte.js';
import guildConfigSchema from '../../lib/models/guildConfigSchema.js';
import { Command } from '../../lib/typings/CommandType.js';

const setup: Command = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('setup features of the bot for your server!')
		.setDefaultMemberPermissions(Permissions.FLAGS.ADMINISTRATOR)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('welcome-channel')
				.setDescription('Setup welcome message for your server.')
				.addChannelOption((option) =>
					option
						.setName('channel')
						.setDescription('The channel where the message is sent in')
						.setRequired(true)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('suggestions')
				.setDescription('Setup suggestions system for your server')
				.addChannelOption((option) =>
					option
						.setName('channel')
						.setDescription('The channel to send the suggestions in')
						.setRequired(true)
				)
		),
	settings: {
		devOnly: false,
	},

	async run(client, interaction) {
		let subcmd = interaction.options.getSubcommand();
		if (subcmd == 'welcome-channel') {
			return setupWelcomeChannel(client, interaction);
		} else if (subcmd == 'suggestions') {
			return setupSuggestions(client, interaction);
		}
	},
};

export default setup;

async function setupWelcomeChannel(client: Byte, interaction: CommandInteraction) {
	const channel = interaction.options.getChannel('channel');
	if (!channel) {
		return interaction.reply('Unexpected error occured! Please try again!');
	}

	if (!interaction.guild)
		guildConfigSchema
			.findOneAndUpdate({ guildId: interaction.guild!.id }, { welcomeChannelId: channel.id })
			.catch((err) => console.error(err));

	await interaction.reply({
		embeds: [
			new MessageEmbed()
				.setTitle('Success!')
				.setColor('GREEN')
				.setDescription(`Successfully set the welcome channel to ${channel}.`)
				.setFooter({
					text: 'Option to customize welcome message would be provided in the future',
				}),
		],
	});
}

async function setupSuggestions(client: Byte, interaction: CommandInteraction) {
	const channel = interaction.options.getChannel('channel');

	if (!channel) return interaction.reply('Unexpected error occured! Please try again!');

	if (!interaction.guild) {
		return interaction.reply('This command can only be ran in a guild!');
	}

	const configSchema = await guildConfigSchema.findOne({ guildId: interaction.guild.id });

	if (!configSchema) {
		return console.error('Setup Command: guildConfigSchema not found!');
	}
	configSchema.suggestions = {
		channelId: channel.id,
	};
	await configSchema.save();

	const embed = new MessageEmbed()
		.setTitle('Success!')
		.setDescription(
			`Your server now has access t suggestions! To suggest, simply navigate to ${channel} and send your suggestion!`
		)
		.setColor('GREEN')
		.setTimestamp();
}
