import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
const reactionRole = {
	data: new SlashCommandBuilder()
		.setName(`reaction-role`)
		.setDescription(`Sets up reaction roles`)
		.addStringOption((option) =>
			option
				.setName(`message-id`)
				.setDescription(`The message-id you want to add the reaction-role to!`)
				.setRequired(true)
		)
		.addStringOption((reaction) =>
			reaction
				.setName(`reaction`)
				.setDescription(`The emoji which should be used for reacting`)
				.setRequired(true)
		)
		.addRoleOption((role) =>
			role.setName(`role`).setDescription(`Role to be given when reacting!`).setRequired(true)
		),

	async run(client, interaction) {
		let message = interaction.options.getString(`message-id`);
		let reaction = interaction.options.getString(`reaction`);
		console.log(reaction);
		let role = interaction.options.getRole(`role`);

		if (isNaN(message))
			return await interaction.reply({
				embeds: [
					new MessageEmbed()
						.setTitle(`Invalid`)
						.setDescription(`Message ID's must be digits!`)
						.setColor(`RED`),
				],
			});

		if (message.length > 19 || message.length < 19)
			return await interaction.reply({
				embeds: [
					new MessageEmbed()
						.setTitle(`Invalid`)
						.setDescription(
							`Message ID's must be ${
								message.length < 19 ? `19 digits in length!` : `must only be 19 digits!`
							}`
						)
						.setColor(`RED`),
				],
			});
		let messageCheck = await interaction.channel.messages.fetch(message);

		if (!messageCheck)
			return await interaction.reply({
				content: `Could not find a message with that id in ${interaction.channel}`,
				ephemeral: true,
			});

		if (role.position >= interaction.guild.me.roles.highest.position)
			return await interaction.reply({
				content: `${role} is higher than me! Please move it below ${interaction.guild.me.roles.highest}`,
				ephemeral: true,
			});
		try {
			await messageCheck.react(reaction);
		} catch {
			return await interaction.reply({
				content: `Please provide a valid emoji`,
				ephemeral: true,
			});
		}

		const collector = messageCheck.createReactionCollector();

		collector.on(`collect`, async (reaction1, user) => {
			//! console.log(reaction1.emoji + ', ' + reaction1.emoji.name + ', ' + reaction);
			const params = {
				interaction,
				user,
				role,
			};
			if (reaction.includes('<:')) {
				if (reaction1.emoji.name === reaction.slice(2).split(`:`)[0]) {
					return addRole(params);
				}
			} else if (!reaction.includes('<:')) {
				if (reaction1.emoji.name == reaction) {
					return addRole(params);
				}
			}
		});

		await interaction.reply({
			embeds: [
				new MessageEmbed()
					.setTitle(`Reaction Added`)
					.setDescription(`${reaction} has been added with the role ${role}`)
					.setColor(`GREEN`)
					.setFooter({
						text: `${interaction.user.tag}`,
						iconURL: interaction.member.displayAvatarURL(),
					}),
			],
		});
	},
};

export default reactionRole;

async function addRole({ interaction, user, role }) {
	let target = interaction.guild.members.cache.get(user?.id);
	let action = target.roles.cache.has(role.id) ? `remove` : `add`;
	await target.roles[action](role.id);
}
