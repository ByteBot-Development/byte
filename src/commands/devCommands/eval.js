import { SlashCommandBuilder } from 'discord.js';
import config from '../../../config.js';
import util from 'util';
import { EmbedBuilder } from 'discord.js';
export const evalcmd = {
	data: new SlashCommandBuilder()
		.setName(`eval`)
		.setDescription(`Evaluates the given code`)
		.addStringOption((code) =>
			code.setName(`code`).setDescription(`Code to be evaled`).setRequired(true)
		),

	settings: {
		devOnly: true,
	},

	async run(client, interaction) {
		//return interaction.reply('This command is under maintainance!');

		if (!config.devs.includes(interaction.user.id))
			return await interaction.reply({
				content: `This command can only be used by developers!`,
				ephemeral: true,
			});

		let code = interaction.options.getString(`code`);

		try {
			if (code.includes(`await`)) {
				let check = code.split(`await `)[1];
				if (check === null || check === undefined) {
					return await interaction.reply({
						embeds: [
							new EmbedBuilder()
								.setTitle(`Denied`)
								.setDescription(`No valid code has been placed after expression \`await\``)
								.setColor(`ORANGE`),
						],
						ephemeral: true,
					});
				}
			}

			let evalCode = code.includes(`await`)
				? `;(async () => { ${code} })().then(output =>  output)`
				: code;

			code = code.replace(`token`, '[Something Important]');
			let output;

			let evaled = await eval(evalCode);

			output = evaled;

			if (!evaled || evaled == null) output = `\`\`\`fix\nNo output\n\`\`\``;

			if (evaled && evaled.type !== `string`) {
				output = `\`\`\`js\n` + util.inspect(output) + `\n\`\`\``;
			}

			if (output.length > 1024) {
				output = `\`\`\`fix\nLarge Output ~ ${output.length} characters!\n\`\`\``;
			}
			try {
				await interaction.reply({
					embeds: [
						new EmbedBuilder()
							.setTitle(`Evaled`)
							.setDescription(`\`\`\`js\n${code}\n\`\`\``)
							.addField(`Output`, output)
							.setColor(`GREEN`)
							.setFooter({
								text: interaction.user.tag,
								iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
							}),
					],
				});
			} catch {
				await interaction.followUp({
					embeds: [
						new EmbedBuilder()
							.setTitle(`Evaled`)
							.setDescription(`\`\`\`js\n${code}\n\`\`\``)
							.addField(`Output`, output)
							.setColor(`GREEN`)
							.setFooter({
								text: interaction.user.tag,
								iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
							}),
					],
				});
			}
		} catch (err1) {
			return await interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setTitle(`Error`)
						.setDescription(`\`\`\`js\n${code}\n\`\`\``)
						.addField(`Output`, `\`\`\`js\n${err1}\n\`\`\``)
						.setColor(`RED`)
						.setFooter({
							text: interaction.user.tag,
							iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
						}),
				],
			});
		}
	},
};

export default evalcmd;
