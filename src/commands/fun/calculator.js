import { SlashCommandBuilder } from '@discordjs/builders';
import {  MessageEmbed } from 'discord.js';

const calculator = {
	data: new SlashCommandBuilder()
		.setName(`calculate`)
		.setDescription(`Calculates given integers.`)
		.addIntegerOption((option) =>
			option.setName(`integer_one`).setDescription(`First Integer`).setRequired(true)
		)
		.addStringOption((option) =>
			option.setName(`action`).setDescription(`Action for calculation`).setRequired(true)
		)
		.addIntegerOption((option) =>
			option.setName(`integer_two`).setDescription(`Second Integer`).setRequired(true)
		),
		syntax: `/calculate integer action integer`,

	async run(client, interaction) {
		const integer1 = interaction.options.getInteger(`integer_one`);
		const integer2 = interaction.options.getInteger(`integer_two`);
		const action = interaction.options.getString(`action`);
		calc(interaction, integer1, integer2, action);
	},
};

export default calculator;


async function calc(interaction, integer1, integer2, action) {
	if (isNaN(integer1) || isNaN(integer2))
		return await interaction.reply({
			content: `Valid integers not provided`,
			ephemeral: true,
		});

	action = action.replace(`add`, `+`);
	action = action.replace(`subtract`, `-`);
	action = action.replace(`divide`, `/`);
	action = action.replace(`multiply`, `*`);

	if (![`-`, `+`, `/`, `*`].includes(action))
		return await interaction.reply({
			embeds: [
				new MessageEmbed()
					.setTitle(`Invalid action.`)
					.setDescription(
						`\`${action}\` is not recognised as a valid action. The only valid actions are \`-\`,\`+\`,\`/\`,\`*\``
					)
					.setColor(`RED`),
			],
			ephemeral: true,
		});

	let result = eval(`${integer1}  ${action} ${integer2}`);

	await interaction.reply({
		content: `Calculating...`,
	});

	setTimeout(async () => {
		await interaction.editReply({
			embeds: [
				new MessageEmbed()
					.setTitle(`Calculated`)
					.setDescription(`**Problem**\n\`\`\`\n${integer1} ${action} ${integer2}\n\`\`\``)
					.addField(`Answer`, `\`\`\`\n${result}\n\`\`\``)
					.setColor(`GREEN`),
			],
			content: `Calculated!`,
		});
	}, 1500);
}
