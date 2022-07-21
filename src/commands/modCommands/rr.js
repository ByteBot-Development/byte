import { SlashCommandBuilder } from 'discord.js';
import reactionRoleSchema from '../../lib/models/reactionRole.js';

const reactionRole = {
	data: new SlashCommandBuilder()
		.setName(`reaction-role`)
		.setDescription(`Sets up reaction roles`)
		.addStringOption((option) =>
			option
				.setName(`type`)
				.setDescription(`The type of message you want to add the reaction-role to!`)
				.addChoices({ name: 'existing', value: `existing` }, { name: `create`, value: `create` })
		),

	async run(client, interaction) {
		let schema = await reactionRoleSchema.findOne({
			guild: interaction.guild.id,
		});

		if (!schema) {
			await reactionRoleSchema.create({
				guild: interaction.guild.id,
			});
		}

		const filter = (collected) => {
			return collected.author.id === interaction.user.id;
		};
		let choice = interaction.options.getString(`type`);

		if (choice === `existing`) {
			let idCheck = await interaction.reply({
				content: `Enter the id of the message that you want to add the reaction role to!`,
				ephemeral: true,
				fetchReply: true,
			});

			let idCollector = idCheck.channel.createMessageCollector({
				filter,
				max: 1,
			});

			idCollector.on(`collect`, async (collected) => {
				if (isNaN(collected.content))
					return await interaction.editReply({
						content: `Message ID's must be valid!`,
						ephemeral: true,
					});

				try {
					await collected.channel.messages.fetch(collected.content).then(async (m) => {
						let emojiReply = await interaction.followUp({
							content: `Type the emoji that you want into the chat now`,
							ephemeral: true,
							fetchReply: true,
						});

						let emojiCollector = await emojiReply.channel.createMessageCollector({
							filter,
							max: 1,
						});

						emojiCollector.on(`collect`, async (emojiCollected) => {
							try {
								await m.react(emojiCollected.content);
							} catch {
								return await emojiReply.editReply({
									content: `Please input a valid emoji`,
									ephemeral: true,
								});
							}

							await reactionRoleSchema.findOneAndUpdate(
								{
									guild: interaction.guild.id,
								},
								{
									message: {
										message: collected.content,
										emoji: emojiCollected.content,
									},
								}
							);
						});
					});
				} catch {
					return await interaction.editReply({
						content: `Could not find a message with that id in <#${interaction.channel.id}>`,
						ephemeral: true,
					});
				}
			});
		}

		if (choice === `create`) {
		}
	},
};

export default reactionRole;
