import { SlashCommandBuilder } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import { ActionRowBuilder, ButtonBuilder } from 'discord.js';
import { promisify } from 'util';
const help = {
	data: new SlashCommandBuilder().setName('help').setDescription('help menu'),
	async run(client, interaction) {
		try {
			const row = new ActionRowBuilder().addComponents(
				new ButtonBuilder().setCustomId('Main').setLabel('Info Commands').setStyle('PRIMARY'),
				new ButtonBuilder().setCustomId('Mod').setLabel('Moderation Commands').setStyle('PRIMARY'),
				new ButtonBuilder()
					.setCustomId('Config')
					.setLabel('Configuation Commands')
					.setStyle('PRIMARY')
			);
			const row2 = new ActionRowBuilder().addComponents(
				new ButtonBuilder().setCustomId('Back').setLabel('back').setStyle('PRIMARY')
			);

			const HelpEmbed = new EmbedBuilder()
				.setTitle('``Help Panel``')
				.setDescription('In order to use the bot, use the prefix ``-`` to use any commands.')
				.setColor('#384281');

			await interaction.reply({
				embeds: [HelpEmbed],
				components: [row],
				ephemeral: true,
			});
			// interactionchannel.send({ embeds: [HelpEmbed], components: [row],  ephemeral: true})

			client.on('interactionCreate', async (ButtonInteraction, interaction, message) => {
				if (!ButtonInteraction.isButton()) return;

				// await ButtonInteraction.deferUpdate()

				if (ButtonInteraction.customId === 'Main') {
					const infoEmbed = new EmbedBuilder()
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
					await ButtonInteraction.update({ embeds: [infoEmbed], components: [row2] });
				}

				if (ButtonInteraction.customId === 'Mod') {
					const infoEmbed = new EmbedBuilder()
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

					await ButtonInteraction.update({
						embeds: [infoEmbed],
						components: [row2],
					}).catch((err) => {
						return;
					});
					await wait(1000);
					if (!ButtonInteraction) {
						return;
					}
				}

				if (ButtonInteraction.customId === 'Config') {
					const infoEmbed = new EmbedBuilder()
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
					await ButtonInteraction.update({
						embeds: [infoEmbed],
						components: [row2],
					}).catch((err) => {
						return;
					});
					await wait(1000);
					if (!ButtonInteraction) {
						return;
					}
				}

				if (ButtonInteraction.customId === 'Back') {
					const HelpEmbed = new EmbedBuilder()
						.setTitle('``Help Panel``')
						.setDescription('In order to use the bot, use the prefix ``/`` to use any commands.')
						.setColor('#384281');

					const row4 = new ActionRowBuilder().addComponents(
						new ButtonBuilder().setCustomId('Main').setLabel('Info Commands').setStyle('PRIMARY'),
						new ButtonBuilder()
							.setCustomId('Mod')
							.setLabel('Moderation Commands')
							.setStyle('PRIMARY'),
						new ButtonBuilder()
							.setCustomId('Config')
							.setLabel('Configuation Commands')
							.setStyle('PRIMARY')
					);

					const wait = promisify(setTimeout);

					await ButtonInteraction.update({
						embeds: [HelpEmbed],
						components: [row4],
					}).catch((err) => {
						return;
					});
					await wait(1000);
					if (!ButtonInteraction) {
						return;
					}
				}
			});
		} catch (err) {
			return;
		}
	},
};

export default help;
