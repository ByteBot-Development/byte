import commandList from '../utils/commandList.js';

async function handleCommands() {
	for (const command of commandList) {
		if (interaction.commandName === command.data.name) {
			await command.run(client, interaction);
		}
	}
}
