import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';

const _8ball = {
	data: new SlashCommandBuilder()
		.setName('8ball')
		.setDescription('Let the bot answer the questions of the universe!')
		.addStringOption((opt) =>
			opt.setName('question').setDescription("What's your question?").setRequired(true)
		),
	settings: {
		devOnly: false,
	},

	async run(client, interaction) {
		const question = interaction.options.getString('question');
		const answers = [...positiveAnswers, ...negativeAnswers, ...neutralAnswers];
		const random = Math.floor(Math.random() * answers.length);
		const reply = answers[random];

		const embed = new MessageEmbed()
			.setTitle('Q: ' + question)
			.setDescription(`- ${reply}`)
			.setAuthor({
				name: interaction.member.user.tag,
				iconURL: interaction.member.displayAvatarURL(),
			});

		if (positiveAnswers.includes(reply)) {
			embed.setColor('GREEN');
		} else if (negativeAnswers.includes(reply)) {
			embed.setColor('RED');
		} else {
			embed.setColor('WHITE');
		}
		await interaction.reply({ embeds: [embed] });
	},
};

export default _8ball;

const positiveAnswers = [
	'Yes.',
	'Yes. Yes. Yes.',
	'Sure thing...',
	'Of course!',
	"Why would you even ask that? Isn't that obviously a YES?",
	"I don't care but yes",
];
const negativeAnswers = [
	'No.',
	'No. No. No.',
	'Pretty much no',
	'Well No.',
	'Definitely no.',
	"I don't care about the outcome, just no.",
];
const neutralAnswers = [
	"I genuinely don't know",
	'50 : 50',
	"To put it simply, I don't care",
	'Who comes up with this stuff?',
	'Damn I have zero answers',
	"Error: My brain can't process it. Oh wait I have no brai- nvm..",
	'Same question for you.',
];
