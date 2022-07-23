import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';

const whois = {
	data: new SlashCommandBuilder()
		.setName('whois')
		.setDescription('Get the information about a user')
		.addUserOption((option) =>
			option.setName('user').setDescription('The user to get the information of').setRequired(true)
		),
	settings: {
		devOnly: false,
	},

	async run(client, interaction) {
		const user = interaction.options.getUser('user');
		const target = interaction.guild.members.cache.get(user.id);
		let embed = new MessageEmbed()
			.setColor('BLURPLE')
			.setTitle(`${user.tag}'s Userinfo`)
			.setThumbnail(user.displayAvatarURL({ dynamic: true }))
			.setDescription(
				`**Usertag:** ${user.tag}\n**UserID:** ${user.id}\n**Created At:** ${user.createdAt}\n**Joined At:** ${target.joinedAt}\n**Nickname:** ${target.displayName}`
			)
			.setColor('#2F3136');
		interaction.reply({ embeds: [embed] });
	},
};

export default whois;
