import Event from '../lib/classes/Event.js';
import commandList from '../lib/utils/commandList.js';

class InteractionCreate extends Event {
	run(interaction) {
		if (interaction.isCommand()) handleCommands(this.client, interaction);
	}
}

async function handleCommands(client, interaction) {
	for (const command of commandList) {
		if (interaction.commandName === command.data.name) {
			await command.run(client, interaction);
			break;
		}
	}
}

export default InteractionCreate;
