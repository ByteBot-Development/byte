import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } from 'discord.js';
import { readdirSync } from 'fs';

const help = {
	data: new SlashCommandBuilder().setName('help').setDescription('Stop it! Get some help.'),
	syntax: `/help`,
	async run(client, interaction) {
		let folders = []
		readdirSync('src/commands').forEach(async (folder) => {
			if(folder === `Dev`) return;
			folders.push(folder)
		});

		let helpRow = new MessageActionRow().addComponents([
			new MessageSelectMenu()
				.setCustomId(`help-row`)
				.setPlaceholder(`Commands`)
				.addOptions(folders.map(m => {
					return {
						label: `${m}`,
						description: `${m} commands`,
						value: m
					}
				})),
		]);

		let helpReply = await interaction.reply({
			embeds: [
				new MessageEmbed()
					.setTitle('Help Panel')
					.setDescription('In order to use the bot, use ``/`` commands.')
					.setColor('#00ff80'),
			],
			components: [helpRow],
			ephemeral: true,
			fetchReply: true
		});

		let HelpMenuCollector = helpReply.createMessageComponentCollector({
			componentType: `SELECT_MENU`,
			time: 15000
		})

		HelpMenuCollector.on(`collect`, async (i) => {
			HelpMenuCollector.resetTimer()
			let commands = []
			if(folders.includes(i.values[0])){

				readdirSync(`src/commands/${i.values[0]}`).forEach(async file => {
					const fileData = await (await import(`../${i.values[0]}/${file}`))
                    commands.push(fileData.default)
				}) 
				
				setTimeout(async () => {
				let commandsMapped = commands.map(m => `\`\`\`fix\n• Name: ${m.data.name},\n• Description: ${m.data.description ?? `No description`}\n• Syntax: ${m.syntax}\n\`\`\``).join(`\n`)
					await i.update({
						embeds: [
							new MessageEmbed()
							.setTitle(`${i.values[0]} Commands!`)
							.setDescription(`${commandsMapped}`)
							.setColor(`#00ff80`)
						],
						ephemeral: true
					})
				}, 500)
			

		
			}
		})

		HelpMenuCollector.on(`end`, async (collected, reason) => {
            helpReply.components[0].components[0].disabled = true;
            if(reason === `time`){
				await interaction.editReply({
					components:[helpReply.components[0]]
				})  
		 	}
		})
	},
};


export default help;
