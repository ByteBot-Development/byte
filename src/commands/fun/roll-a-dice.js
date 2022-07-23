import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';

const rollDice = {
	data: new SlashCommandBuilder()
		.setName('roll-a-dice')
		.setDescription('roll a dice and see how lucky you are!'),
	settings: {
		devOnly: false,
	},

	async run(client, interaction) {
		// A function that replies with rolling. with a loading animation
		await replySequence(interaction);
		// A function that generates random number between 1 and 6.
		// const random = getRandomNumber(1, 6);
		let max = 6;
		let min = 1;
		const random = Math.floor(Math.random() * max) + min;
		let diceString = 'Error!';
		switch (random) {
			case 1:
				diceString = `⬛⬛⬛⬛⬛\n⬛⬛⬛⬛⬛\n⬛⬛🟦⬛⬛\n⬛⬛⬛⬛⬛\n⬛⬛⬛⬛⬛`;
				break;
			case 2:
				diceString = `⬛⬛⬛⬛⬛\n⬛🟦⬛⬛⬛\n⬛⬛⬛⬛⬛\n⬛⬛⬛🟦⬛\n⬛⬛⬛⬛⬛`;
				break;
			case 3:
				diceString = `⬛⬛⬛⬛⬛\n⬛🟦⬛⬛⬛\n⬛⬛🟦⬛⬛\n⬛⬛⬛🟦⬛\n⬛⬛⬛⬛⬛`;
				break;
			case 4:
				diceString = `⬛⬛⬛⬛⬛\n⬛🟦⬛🟦⬛\n⬛⬛⬛⬛⬛\n⬛🟦⬛🟦⬛\n⬛⬛⬛⬛⬛`;
				break;
			case 5:
				diceString = `⬛⬛⬛⬛⬛\n⬛🟦⬛🟦⬛\n⬛⬛🟦⬛⬛\n⬛🟦⬛🟦⬛\n⬛⬛⬛⬛⬛`;
				break;
			case 6:
				diceString = `⬛⬛⬛⬛⬛\n⬛🟦⬛🟦⬛\n⬛🟦⬛🟦⬛\n⬛🟦⬛🟦⬛\n⬛⬛⬛⬛⬛`;
		}

		const embed = new MessageEmbed()
			.setTitle('Your dice of fortune!')
			.setDescription(`You got a **${random}!**\n\n${diceString}`)
			.setColor('GREEN')
			.setFooter({ text: 'How was your fortune?' });
		setTimeout(async () => await interaction.editReply({ embeds: [embed] }), 1600);
	},
};

export default rollDice;

async function replySequence(interaction) {
	await interaction.reply('Generating your dice of fortune...');
	await interaction.editReply('Rolling.');
	setTimeout(async () => await interaction.editReply({ content: 'Rolling..' }), 500);
	setTimeout(async () => await interaction.editReply({ content: 'Rolling...' }), 500);
	setTimeout(async () => await interaction.editReply({ content: 'Rolling....' }), 500);
}
