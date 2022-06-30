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
			if (command.settings != undefined) {
				// if (
				// 	command.settings.permissions &&
				// 	command.settings.permissions.length > 0 &&
				// 	!interaction.member.permissions.has(command.settings.permissions)
				// ) {
				// 	return interaction.reply({
				// 		content: "You don't have the required permissions to run this command!",
				// 		ephemeral: true,
				// 	});
				// }

				if (command.settings.devOnly && !client.config.devs.includes(interaction.member.id)) {
					return interaction.reply({
						content: 'This command is only available for the core developers of byte!',
						ephemeral: true,
					});
				}

				if (command.settings.ownerOnly && interaction.member.id !== interaction.guild.ownerId) {
					return interaction.reply({
						content: 'This command is only availabe to the owner of Byte!',
						ephemeral: true,
					});
				}
			}

			await command.run(client, interaction);
			break;
		}
	}
}

export default InteractionCreate;
