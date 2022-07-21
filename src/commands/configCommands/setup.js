import { SlashCommandBuilder } from 'discord.js';
import { PermissionsBitField, EmbedBuilder } from 'discord.js';
import guildConfigSchema from '../../lib/models/guildConfigSchema.js';

const setup = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('setup features of the bot for your server!')
		.setDefaultMemberPermissions(PermissionsBitField.ADMINISTRATOR)
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
		),
	settings: {
		devOnly: false,
	},

	async run(client, interaction) {
		let subcmd = interaction.options.getSubcommand();
		if (subcmd == 'welcome-channel') {
			return setupWelcomeChannel(client, interaction);
		} else if (subcmd == 'leave-message') {
			return setupLeaveMessage(client, interaction);
		}
	},
};

export default setup;

async function setupWelcomeChannel(client, interaction) {
	const channel = interaction.options.getChannel('channel');

	guildConfigSchema
		.findOneAndUpdate({ guildId: interaction.guild.id }, { welcomeChannelId: channel.id })
		.catch((err) => console.error(err));

	await interaction.reply({
		embeds: [
			new EmbedBuilder()
				.setTitle('Success!')
				.setColor('GREEN')
				.setDescription(`Successfully set the welcome channel to ${channel}.`)
				.setFooter({
					text: 'Option to customize welcome message would be provided in the future',
				}),
		],
	});
}
