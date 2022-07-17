import { SlashCommandBuilder } from '@discordjs/builders';
import { PermissionFlagsBits } from 'discord-api-types/v9';
import { Message, MessageEmbed } from 'discord.js';

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

	async run(client, interaction) {

		if(!interaction.guild.me.permissions.has(`BAN_MEMBERS`)) return await interaction.reply({
			content: `I do not have permissions to do that! Make sure that I have the \`BAN MEMBERS\` permission.`
		});
		const userId = interaction.options.getString('user-id');
		const reason = interaction.options.getString('reason');
		if(isNaN(userId)) return await interaction.reply({
			embeds:[
				new MessageEmbed()
				.setTitle(`Error`)
				.setDescription(`User-ID's must be a number!`)
				.setColor(`RED`)
			]
		,
		ephemeral: true
	})

	if(userId.length < 18) return await interaction.reply({
		embeds: [
			new MessageEmbed()
			.setTitle(`Error`)
			.setDescription(`User-ID's must be 18 characters long!`)
			.setColor(`RED`)
		]
	})

	let banCheck = await interaction.guild?.bans?.fetch(userId)
	
		if(!banCheck) return await interaction.reply({
				embeds :[
					new MessageEmbed()
					.setTitle(`Unknown Ban`)
					.setDescription(`Could not find a ban with the User-ID \`${userId}\`!`)
					.setColor(`RED`)
				]
			})


			try {
				await interaction.guild.members.unban(userId, {reason: reason?.toString() ?? `No reason`}).then(async () => {
				await interaction.reply({
					embeds:[
						new MessageEmbed()
						.setTitle(`Un-banned`)
						.setDescription(`Successfully un-banned <@${userId}>`)
						.addField(`Reason`, reason ?? `No reason provided`)
						.setColor(`GREEN`)
						.setFooter({
							text: interaction.user.tag,
							iconURL: interaction.user.displayAvatarURL()
						})
					]
				})
			})
			} catch  (err) {
				console.log(err)
		       return await interaction.reply({
				embeds: [
					new MessageEmbed()
					.setTitle(`Error`)
					.setDescription(`Something went wrong!`)
					.setColor(`RED`)
					.setFooter({
						text: interaction.user.tag,
						iconURL: interaction.user.displayAvatarURL()
					})
				]
			   })
			}

			
	},
};

export default unban;
