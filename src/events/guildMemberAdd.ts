import guildConfigSchema from '../lib/models/guildConfigSchema.js';

import Event from '../lib/classes/Event.js';

class GuildMemberAdd extends Event {
	run(member) {
		guildConfigSchema.findOne({ guildId: member.guild.id }, async (err, data) => {
			if (err) throw err;
			if (data) {
				if (data.welcomeMsg) {
					const replyMsg = formatString(data.welcomeMsg.message, member);
					member.guild.channels.cache.get(data.welcomeMsg.channelId).send(replyMsg);
				} else {
					console.log('channel not found');
				}
			} else if (!data) {
				console.error('"guildConfigSchema" not found for ' + member.guild.id);
			}
		});
	}
}

export default GuildMemberAdd;

function formatString(str, member) {
	const formattedString = str
		.replaceAll('{{@user}}', member)
		.replaceAll('{{username}}', member.user.username)
		.replaceAll('{{usertag}}', member.user.tag);

	return formattedString;
}
