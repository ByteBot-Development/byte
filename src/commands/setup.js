import { SlashCommandBuilder } from '@discordjs/builders';

export const setup = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Setup some features for your server!')
		.addSubcommand((subcommand) => {
			subcommand.setName('blacklist').setDescription('setup blacklist system for your server!');
		}),
    async run(client, interaction) {
      if (interaction.options.getSubcommand(sub))
    }
};
