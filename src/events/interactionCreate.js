import Event from '../lib/classes/Event.js';
import blacklistSchema from '../lib/models/blacklistSchema.js';
import commandList from '../lib/utils/commandList.js';

class InteractionCreate extends Event {
	run(interaction) {
		if (interaction.isCommand()) handleCommands(this.client, interaction);
	}
}

async function handleCommands(client, interaction) {
	for (const command of commandList) {
		if (interaction.commandName === command.data.name) {
			let check = await blacklistSchema.findOne({
				client: client.user.id,
			});
			
			if (check != null) {
				if (check.userId.includes(interaction.member.id))
				return await interaction.reply({
					content: `You have been blacklisted from ${client.user.username}! You can no longer use any commands in this bot!`,
					ephemeral: true,
				});
			}
			
			if (check.userId.includes(interaction.member.id))
				return await interaction.reply({
					content: `You have been blacklisted from ${client.user.username}! You can no longer use any commands in this bot!`,
					ephemeral: true,
				});
			if (command.settings != undefined) {
				if (command.settings.devOnly && !client.config.devs.includes(interaction.member.id)) {
					return interaction.reply({
						content: 'This command is only available for the core developers of byte!',
						ephemeral: true,
					});
				}

				if (command.settings.ownerOnly && interaction.member.id !== interaction.guild.ownerId) {
					return interaction.reply({
						content: 'This command is only availabe to the owner of the server!',
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
