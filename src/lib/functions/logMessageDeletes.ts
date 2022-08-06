import { MessageEmbed } from 'discord.js';
import logsSchema from '../models/logsSchema';

function logMessageDeletes(client, message) {
	const embed = new MessageEmbed()
		.setTitle('Message Deleted!')
		.setDescription(
			`Message deleted in ${message.channel} by ${message.author}. Content: \`\`\`\n${
				message.content || 'No Content!'
			}\n`.slice(0, 4096)
		)
		.setColor('RED');

	logsSchema.findOne({ guildId: message.guildId }, async (err, data) => {
		if (err) throw err;
		if (data) {
			message.guild.channels
				.fetch(data.messageDeleteChannelId)
				.then((channel) => channel.send({ embeds: embed }));
		}
	});
}
