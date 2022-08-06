import guildConfigSchema from '../lib/models/guildConfigSchema.js';
import Event from '../lib/classes/Event.js';

class GuildDelete extends Event {
	run(guild) {
		deleteGuildConfig(guild);
	}
}

export default GuildDelete;

function deleteGuildConfig(guild) {
	guildConfigSchema.findOneAndDelete({ guildId: guild.id }).catch((err) => {});
}
