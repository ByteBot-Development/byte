import getFiles from './getFiles.js';

async function loadCommands(client) {
	getFiles(`./src/commands`, '.js').forEach(async (fileName) => {
		const commandName = fileName.split('.js')[0];
		const Command = (await import(`../../commands/${fileName}`)).default;
		const command = new Command(client, commandName);
		client.commands.set(commandName, command);
	});
}

export default loadCommands;
