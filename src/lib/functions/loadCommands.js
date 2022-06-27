import getFiles from './getFiles.js';
import { client } from '../../index.js';

async function loadCommands() {
	getFiles(`./src/commands`, '.js').forEach(async (fileName) => {
		const commandName = fileName.split('.js')[0];
		// const Command = (await import(`../../commands/${fileName}`)).default;
		// const command = new Command(client, commandName);
		const command = await import(`../../commands/${fileName}`);
		client.commands.set(commandName, command);
	});
}

export default loadCommands;
