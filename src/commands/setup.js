import { SlashCommandBuilder } from '@discordjs/builders';

export const setup = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Setup some features for your server!')

}
