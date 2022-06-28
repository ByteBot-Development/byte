import Event from '../lib/classes/Event.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import commandList from '../lib/utils/commandList.js';
import config from '../../config.js';

class Ready extends Event {
	async run() {
		const { TOKEN, TEST_GUILD_ID, CLIENT_ID } = process.env;
		const rest = new REST({ version: '9' }).setToken(TOKEN);
		const commandData = commandList.map((command) => command.data.toJSON());
		const { registerSlashcommandGlobally } = config;

		registerSlashcommandGlobally
			? await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commandData })
			: await rest.put(Routes.applicationGuildCommands(CLIENT_ID, TEST_GUILD_ID), { body: commandData });

		console.log(`Registered Application (/) Commands ${registerSlashcommandGlobally ? 'Globally' : 'Locally'}!`);
		console.log(`Connected to Discord via ${this.client.user.tag}!`);
	}
}

export default Ready;
