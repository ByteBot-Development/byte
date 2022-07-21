import { SlashCommandBuilder } from 'discord.js';
import { EmbedBuilder } from 'discord.js';

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

		let infoembed = new EmbedBuilder()

			.setTitle('Bot information')
			.setDescription(
				'Byte is a public multi-purpose bot. It has many functions including; Moderation, Economy, Auto roles, suggestion system, and logging. Currently this bot is on the road to be verified so if you would like to help us out please invite the bot to your server.'
			)
			.setThumbnail(client.user.avatarURL())
			.addFields(
				{ name: 'Owner: ', value: ' <@743932626196365343>' },
				{
					name: 'Developers: ',
					value: devsNames,
				},
				{ name: 'Last updated:', value: '4/28/2022' },
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
			.setColor('#384281');

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
