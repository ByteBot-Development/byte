import guildConfigSchema from '../lib/models/guildConfigSchema.js';

import Event from '../lib/classes/Event.js';

class GuildMemberAdd extends Event {
	run(member) {
		guildConfigSchema.findOne({ guildId: member.guild.id }, async (err, data) => {
			if (err) throw err;
			if (data) {
				if (data.welcomeChannelId) {
					member.guild.channels.cache.get(data.welcomeChannelId).send(`Welcome ${member}!`);
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
