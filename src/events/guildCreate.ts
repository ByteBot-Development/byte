import guildConfigSchema from '../lib/models/guildConfigSchema.js';

import Event from '../lib/classes/Event.js';

class GuildCreate extends Event {
	run(guild) {
		setupGuildConfig(guild);
	}
}

export default GuildCreate;

async function setupGuildConfig(guild) {
	await guildConfigSchema.create({ guildId: guild.id });
}
