import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';

const description =
	'Byte is a muti-purpose discord bot which provides you features such as Moderation, Auto-Roles, Fun commands, Suggestions, logging and much more!';

const botInfo = {
	data: new SlashCommandBuilder()
		.setName('bot-info')
		.setDescription('Get the information on the bot'),
	settings: {
		devOnly: false,
	},

	async run(client, interaction) {
		const devsArray = getBotDevs(client);
		const devsNames = formatString(devsArray.toString());

		let infoembed = new MessageEmbed()

			.setTitle('Bot information')
			.setDescription(description)
			.setThumbnail(client.user.avatarURL({ size: 4096 }))
			.addFields(
				{ name: 'Owner: ', value: ' <@743932626196365343>' },
				{
					name: 'Developers: ',
					value: devsNames,
				},
				{
					name: 'Changelog:',
					value: '[Change log](https://sites.google.com/view/byteofficial/change-log)',
				},
				{
					name: 'Version',
					value: client.config.version,
				},
				{ name: 'Created:', value: '1/22/2022' }
			)
			.setColor('BLURPLE');

		interaction.reply({ embeds: [infoembed] });
	},
};

export default botInfo;

function getBotDevs(client) {
	const devsList = [];

	client.config.devs.map((dev) => devsList.push(`<@${dev}>`));
	return devsList;
}

function formatString(string) {
	return string.replaceAll(',', ', ');
}
