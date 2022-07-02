import { SlashCommandBuilder } from '@discordjs/builders';
import { PermissionFlagsBits } from 'discord-api-types/v9';
import { Message, MessageEmbed } from 'discord.js';
const ban = {
	data: new SlashCommandBuilder()
		.setName(`ban`)
		.setDescription(`Bans a member`)
		.addUserOption((user) => user.setName(`member`).setDescription(`The member you want to ban`).setRequired(true))
		.addStringOption((reason) => reason.setName(`reason`).setDescription(`The reason you want to ban the user for!`))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

	async run(client, interaction) {
		const member = interaction.guild.members.cache.get(interaction.options.getUser(`member`).id);
		const reason = interaction.options.getString(`reason`);
		let userHighestRole = interaction.member.roles.highest.position;
		let memberHighestRole = member.roles.highest.position;
        let meHighestRole = interaction.guild.me.roles.highest.position

    		if (userHighestRole <= memberHighestRole)
			return await interaction.reply({
				embeds: [
					new MessageEmbed()
						.setTitle(`Failed`)
						.setDescription(
							`You cannot ban this user because your role's highest position ${(userHighestRole == memberHighestRole
								? `is equal to`
								: `is lower than`)} ${member}'s role's highest position`
						)
						.setColor(`RED`),
				],
				ephemeral: true,
			});


            if(meHighestRole <= memberHighestRole) return await interaction.reply({
				embeds: [
					new MessageEmbed()
						.setTitle(`Failed`)
						.setDescription(
							`I cannot ban this user because my role's highest position ${(meHighestRole == memberHighestRole
								? `is equal to`
								: `is lower than`)} ${member}'s role's highest position`
						)
						.setColor(`RED`),
				],
				ephemeral: true,
			}); 

		const sendEmbed = new MessageEmbed()
			.setTitle(`Banned`)
			.setDescription(`${member} has been successfully banned`)
			.setFooter({
				text: interaction.user.tag,
				iconUrl: interaction.member.displayAvatarURL(),
			})
			.setColor(`GREEN`);

		const banned = new MessageEmbed()
			.setTitle(`Banned`)
			.setDescription(`You have been banned in ${interaction.guild.name}`)
			.addField(`Responsible Moderator`, `${interaction.user.tag}(${interaction.member.id})`)
			.setFooter({
				text: interaction.user.tag,
				iconUrl: interaction.member.displayAvatarURL(),
			})
			.setColor(`DARK_RED`);

		if (reason) {
			banned.setDescription(`You have been banned in ${interaction.guild.name} for \`${reason}\``);
			sendEmbed.setDescription(`${member} has been successfully banned for ${reason}`)
		}

		try {
			await member.send({
				embeds: [banned],
			});
		} catch {
			sendEmbed.addField(`DM failed!`, `Could not dm ${member}`);
		}

        try {
         await member.ban({reason: reason ?? null}).then(async () => {
            await interaction.reply({
                embeds:[sendEmbed]
            })
         })
        } catch (err) {
			console.log(err)
          await interaction.channel.send({
            embeds: [
                new MessageEmbed()
                .setTitle(`Failed`)
                .setDescription(`Couldnt ban ${member}! Make sure my role has the \`BAN MEMBERS\` permission.`)
                .setColor(`RED`)
                .setFooter({
                    text: interaction.user.tag,
                    iconUrl: interaction.user.displayAvatarURL()
                })
            ]
          })
        }
	},
};

export default ban;
