import { SlashCommandBuilder } from '@discordjs/builders';
import { PermissionFlagsBits } from 'discord-api-types/v9';
import { MessageEmbed } from 'discord.js';

const unban = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('unban a banned user')
		.addStringOption((option) =>
			option.setName('user-id').setDescription('The ID of the user to unban').setRequired(true)
		)
		.addStringOption((option) =>
			option.setName('reason').setDescription('The reason to unban this user')
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	settings: {
		devOnly: false,
	},
	syntax: `/unban user-id reason`,

	async run(client, interaction) {
		if (!interaction.guild.me.permissions.has(`BAN_MEMBERS`))
			return await interaction.reply({
				content: `I do not have permissions to do that! Make sure that I have the \`BAN MEMBERS\` permission.`,
			});
		const userId = interaction.options.getString('user-id');
		const reason = interaction.options.getString('reason');
		const embed = new MessageEmbed().setTitle('User Unbanned!');
	},
};

export default unban;
