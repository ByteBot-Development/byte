import commandList from '../utils/commandList.js';

async function handleCommands() {
	for (const command of commandList) {
		if (interaction.commandName === command.data.name) {
			if((command.syntax == null) && command.data.name != `eval`) throw new TypeError(
				`Please provide a syntax for ${command.data.name}!`
			)
			await command.run(client, interaction);
		}
	}
}
