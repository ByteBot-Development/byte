import { SlashCommandBuilder } from '@discordjs/builders';
import { PermissionFlagsBits } from 'discord-api-types/v9';
import { InteractionCollector, Message, MessageEmbed } from 'discord.js';
const kick = {
	data: new SlashCommandBuilder()
		.setName(`kick`)
		.setDescription(`Kicks a member`)
		.addUserOption((user) =>
			user.setName(`member`).setDescription(`The member you want to kick`).setRequired(true)
		)
		.addStringOption((reason) =>
			reason.setName(`reason`).setDescription(`The reason you want to kick the user for!`)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

	async run(client, interaction) {
		const member = interaction.guild.members.cache.get(interaction.options.getUser(`member`).id);
		const reason = interaction.options.getString(`reason`);
		let userHighestRole = interaction.member.roles.highest.position;
		let memberHighestRole = member.roles.highest.position;
		let meHighestRole = interaction.guild.me.roles.highest.position;

		if (member.id === interaction.guild.ownerId)
			return await interaction.reply({
				embeds: [
					new MessageEmbed()
						.setTitle(`Denied`)
						.setDescription(`You cannot kick the owner of this server!`)
						.setColor(`RED`)
						.setFooter({
							text: interaction.user.tag,
							iconURL: interaction.member.displayAvatarURL(),
						}),
				],
				ephemeral: true,
			});

		if (member.id === interaction.user.id)
			return await interaction.reply({
				embeds: [
					new MessageEmbed()
						.setTitle(`Failed`)
						.setDescription(`You cannot kick yourself!`)
						.setColor(`RED`)
						.setFooter({
							text: interaction.user.tag,
							iconURL: interaction.member.displayAvatarURL(),
						}),
				],
				ephemeral: true,
			});

		if (userHighestRole <= memberHighestRole)
			return await interaction.reply({
				embeds: [
					new MessageEmbed()
						.setTitle(`Failed`)
						.setDescription(
							`You cannot kick this user because your role's highest position ${
								userHighestRole == memberHighestRole ? `is equal to` : `is lower than`
							} ${member}'s role's highest position`
						)
						.setColor(`RED`),
				],
				ephemeral: true,
			});

		if (meHighestRole <= memberHighestRole)
			return await interaction.reply({
				embeds: [
					new MessageEmbed()
						.setTitle(`Failed`)
						.setDescription(
							`I cannot kick this user because my role's highest position ${
								meHighestRole == memberHighestRole ? `is equal to` : `is lower than`
							} ${member}'s role's highest position`
						)
						.setColor(`RED`),
				],
				ephemeral: true,
			});

		const sendEmbed = new MessageEmbed()
			.setTitle(`Kicked`)
			.setDescription(`${member} has been successfully kicked`)
			.setFooter({
				text: interaction.user.tag,
				iconURL: interaction.member.displayAvatarURL(),
			})
			.setColor(`GREEN`);

		const kicked = new MessageEmbed()
			.setTitle(`Kicked`)
			.setDescription(`You have been kicked in ${interaction.guild.name}`)
			.addField(`Responsible Moderator`, `${interaction.user.tag}(${interaction.member.id})`)
			.setFooter({
				text: interaction.user.tag,
				iconURL: interaction.member.displayAvatarURL(),
			})
			.setColor(`DARK_RED`);

		if (reason) {
			kicked.setDescription(`You have been kicked in ${interaction.guild.name} for \`${reason}\``);
			sendEmbed.setDescription(`${member} has been successfully kicked for ${reason}`);
		}

		try {
			await member.send({
				embeds: [kicked],
			});
		} catch {
			sendEmbed.addField(`DM failed!`, `Could not dm ${member}`);
		}

		try {
			await member.kick({ reason: reason ?? null }).then(async () => {
				await interaction.reply({
					embeds: [sendEmbed],
				});
			});
		} catch (err) {
			console.log(err);
			await interaction.channel.send({
				embeds: [
					new MessageEmbed()
						.setTitle(`Failed`)
						.setDescription(
							`Couldnt kick ${member}! Make sure my role has the \`KICK MEMBERS\` permission.`
						)
						.setColor(`RED`)
						.setFooter({
							text: interaction.user.tag,
							iconURL: interaction.user.displayAvatarURL(),
						}),
				],
			});
		}
	},
};

export default kick;
