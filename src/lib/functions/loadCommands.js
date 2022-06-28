import { readdirSync } from 'fs';
import getFiles from './getFiles.js';
import { client } from '../../index.js';

async function loadCommands() {
	readdirSync('./src/commands').forEach((folder) => {
		getFiles(`./src/commands/${folder}`, '.js').forEach(async (fileName) => {
			const commandName = fileName.split('.js')[0];
			const command = await import(`../../commands/${folder}/${fileName}`);
			client.commands.set(commandName, command);
		});
	});
}
export default loadCommands;
