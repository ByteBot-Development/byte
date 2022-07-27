import Event from '../lib/classes/Event.js';
import schema from '../lib/models/blacklistSchema.js';
import util from 'util';
import { MessageEmbed, ReactionEmoji } from 'discord.js';
import guildConfigSchema from '../lib/models/guildConfigSchema.js';
class MessageCreate extends Event {
	async run(message) {
		if (message.author.bot) return;

		const configSchema = await guildConfigSchema.findOne({ guildId: message.guild.id });
		if (message.channel.id === configSchema.suggestions.channelId) {
			return sendSuggestion(this.client, message);
		}
		const prefix = '--';
		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const cmd = args.shift().toLowerCase();

		if (cmd === 'blacklist') {
			if (!args[0] || args[0] == ` `)
				return message.reply({
					embeds: [
						new MessageEmbed()
							.setTitle(`Blacklist subcommands`)
							.setDescription(
								`• add ~ \`Adds a blacklisted user\`\n• remove ~ \`Removes a blacklisted user!\``
							)
							.setColor(`AQUA`),
					],
				});

			let member = Number(args[1]);

			let userCheck = `(${member})`;

			let check = await schema.findOne({
				client: client.user.id,
			});

			if (!member)
				return message.reply({
					embeds: [
						new MessageEmbed()
							.setTitle(`Invalid Usage`)
							.setDescription(`Please provide an id!`)
							.setColor(`DARK_ORANGE`)
							.setFooter({
								text: message.author.username,
								iconURL: message.author.displayAvatarURL(),
							}),
					],
				});

			if (args[0] === `add`) {
				if (check && check.userId.includes(member))
					return message.reply({
						embeds: [
							new MessageEmbed()
								.setTitle(`Already Blacklisted`)
								.setDescription(`That user is already blacklisted!`)
								.setColor(`ORANGE`)
								.setFooter({
									text: message.author.username,
									iconURL: message.author.displayAvatarURL,
								}),
						],
					});

				if (isNaN(member))
					return message.reply({
						embeds: [
							new MessageEmbed()
								.setTitle(`Invalid ID`)
								.setDescription(`User-ID's must be a number!`)
								.setColor(`RED`)
								.setFooter({
									text: message.author.username,
									iconURL: message.author.displayAvatarURL(),
								}),
						],
					});
				blacklist(this.client, member).then(() => {
					message.reply({
						embeds: [
							new MessageEmbed()
								.setTitle(`Blacklisted`)
								.setDescription(`${userCheck} has been blacklisted from ${client.user.username}!`)
								.setColor(`GREEN`)
								.setFooter({
									text: message.author.tag,
									iconURL: message.author.displayAvatarURL,
								}),
						],
					});
				});
			} else if (args[0] === `remove`) {
				if (isNaN(member))
					return message.reply({
						embeds: [
							new MessageEmbed()
								.setTitle(`Invalid ID`)
								.setDescription(`User-ID's must be a number!`)
								.setColor(`RED`)
								.setFooter({
									text: message.author.username,
									iconURL: message.author.displayAvatarURL(),
								}),
						],
					});

				if (!check)
					return message.reply({
						embeds: [
							new MessageEmbed()
								.setTitle(`No Blacklists!`)
								.setDescription(
									`There aren't any blacklists just yet! But if you see someone doing something wrong, Dont hesitate to swing that almighty hammer!`
								)
								.setColor(`DARK_GOLD`),
						],
					});

				if (!check.userId.includes(member))
					return message.reply({
						embeds: [
							new MessageEmbed()
								.setTitle(`Not Found!`)
								.setDescription(
									`That user was not found in the database! Use \`--blacklist add (user-id)\` to blacklist a user!`
								)
								.setColor(`RED`)
								.setFooter({
									text: message.author.username,
									iconURL: message.author.displayAvatarURL(),
								}),
						],
					});

				unBlacklist(this.client, member).then(() => {
					message.reply({
						embeds: [
							new MessageEmbed()
								.setTitle(`Blacklist removed!`)
								.setDescription(`${userCheck} has been removed from blacklist!`)
								.setColor(`GREEN`)
								.setFooter({
									text: message.author.username,
									iconURL: message.author.displayAvatarURL(),
								}),
						],
					});
				});
			}
		}
	}
}

export default MessageCreate;

async function blacklist(client, user) {
	let checking = await schema.findOne({
		client: client.user.id,
	});

	if (!checking) {
		await schema.create({
			client: client.user.id,
		});
	}

	await schema.findOneAndUpdate(
		{
			client: client.user.id,
		},
		{
			$push: {
				userId: user,
			},
		}
	);
}

async function unBlacklist(client, user) {
	await schema.findOneAndUpdate(
		{
			client: client.user.id,
		},
		{
			$pull: {
				userId: user,
			},
		}
	);
}

async function sendSuggestion(client, message) {
	const { content } = message;

	const embed = new MessageEmbed()
		.setAuthor({
			name: message.author.username,
			iconURL: message.author.displayAvatarURL({ dynamic: true }),
		})
		.setDescription('- ' + content)
		.addFields([{ name: 'Status', value: "⚪ Waiting for community's response..." }])
		.setColor('WHITE')
		.setFooter({
			text: 'Wanna suggest something too? Just send your suggestion in this channel!',
		});

	const sentMessage = await message.channel.send({ embeds: [embed] });
	await sentMessage.react('🟢');
	await sentMessage.react('🔴');
	await message.delete();
}
