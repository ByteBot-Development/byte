import { CommandInteraction, Interaction } from 'discord.js';
import Byte from '../lib/classes/Byte';
import Event from '../lib/classes/Event.js';
import blacklistSchema from '../lib/models/blacklistSchema.js';
import commandList from '../lib/utils/commandList.js';

class InteractionCreate extends Event {
	run(interaction: Interaction) {
		if (interaction.isCommand()) handleCommands(this.client, interaction);
		if (interaction.isButton()) handleButtons(this.client, interaction);
	}
}

async function handleCommands(client: Byte, interaction: CommandInteraction) {
	for (const command of commandList) {
		if (interaction.commandName === command.data.name) {
			let check = await blacklistSchema.findOne({
				client: client.user.id,
			});

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

async function handleButtons(client, interaction) {
	if (interaction.customId === 'Main') {
		const infoEmbed = new MessageEmbed()
			.setTitle('```Info Commands```')
			.setColor('#384281')

			.addFields({
				name: '/botinfo',
				value: `> Shows the help menu [This menu]`,
				inline: false,
			})

			.addFields({
				name: '/membercount',
				value: `> Shows the amount of members in your server.`,
				inline: false,
			})

			.addFields({
				name: '/help',
				value: `> Shows the help menu [this command]`,
				inline: false,
			})
			.addFields({
				name: '/membercount',
				value: `> Shows the amount of members in your server.`,
				inline: false,
			})

			.addFields({
				name: '/ping',
				value: `> Shows the bot's ping, uptime, version etc.`,
				inline: false,
			})
			.addFields({
				name: '/whois',
				value: `> Gets info of a member.`,
				inline: false,
			});

		const wait = promisify(setTimeout);

		await wait(1000);
		await interaction.update({ embeds: [infoEmbed], components: [row2] });
	}

	if (interaction.customId === 'Mod') {
		const infoEmbed = new MessageEmbed()
			.setTitle('```Moderation Commands```')
			.setColor('#384281')

			.addFields({
				name: '/Kick [@ User, <reason>]',
				value: `> Kicks a member from your server`,
				inline: false,
			})

			.addFields({
				name: '/Ban [@ User, <reason>]',
				value: `> Bans a member from your server`,
				inline: false,
			})

			.addFields({
				name: 'Purge [Amount]',
				value: `> Purge messages from a text channel`,
				inline: false,
			})

			.addFields({
				name: '/Mute [@ User, duration, reason ]',
				value: `> Mutes a user`,
				inline: false,
			})

			.addFields({
				name: '/unmute [@ User ]',
				value: `> Unmutes a user`,
				inline: false,
			})

			.addFields({
				name: '/announce [message]',
				value: `> Make an announcement`,
				inline: false,
			})

			.addFields({
				name: '/unban [ID]',
				value: `> Unban someone from the server.`,
				inline: false,
			});

		const wait = promisify(setTimeout);

		await interaction
			.update({
				embeds: [infoEmbed],
				components: [row2],
			})
			.catch((err) => {
				return;
			});
		await wait(1000);
		if (!interaction) {
			return;
		}
	}

	if (interaction.customId === 'Config') {
		const infoEmbed = new MessageEmbed()
			.setTitle('```Configuation Commands```')
			.setColor('#384281')

			.addFields({
				name: '/setautorole [@ role]',
				value: `> Sets a role that is given to a user when they join`,
				inline: false,
			})

			.addFields({
				name: '/setmodlogs',
				value: `> Sets channel to mod logs`,
				inline: false,
			})

			.addFields({
				name: '/addmod',
				value: `> Sets the role that is able to see tickets`,
				inline: false,
			})

			.addFields({
				name: '/setprefix',
				value: `> Sets the bots prefix`,
				inline: false,
			});
		// .setFooter("Prefix: ;")
		const wait = promisify(setTimeout);
		await interaction
			.update({
				embeds: [infoEmbed],
				components: [row2],
			})
			.catch((err) => {
				return;
			});
		await wait(1000);
		if (!interaction) {
			return;
		}
	}

	if (interaction.customId === 'Back') {
		const HelpEmbed = new MessageEmbed()
			.setTitle('``Help Panel``')
			.setDescription('In order to use the bot, use the prefix ``/`` to use any commands.')
			.setColor('#384281');

		const row4 = new MessageActionRow().addComponents(
			new MessageButton().setCustomId('Main').setLabel('Info Commands').setStyle('PRIMARY'),
			new MessageButton().setCustomId('Mod').setLabel('Moderation Commands').setStyle('PRIMARY'),
			new MessageButton()
				.setCustomId('Config')
				.setLabel('Configuation Commands')
				.setStyle('PRIMARY')
		);

		const wait = promisify(setTimeout);

		await interaction
			.update({
				embeds: [HelpEmbed],
				components: [row4],
			})
			.catch((err) => {
				return;
			});
		await wait(1000);
		if (!interaction) {
			return;
		}
	}
}

export default InteractionCreate;
