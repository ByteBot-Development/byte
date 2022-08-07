import 'dotenv/config';

import { Client, Collection, MessageEmbed } from 'discord.js';
import config from '../../../config.js';
import intents from '../constants/intentsList.js';

class Byte extends Client {
	constructor() {
		super({
			intents,
			allowedMentions: { parse: ['users'] },
		});
		this.config = config;
		this.commands = new Collection();
		this.events = new Collection();
		this.slashcommands = new Collection();
	}
	async sendError(interaction, title, description, isEphemeral) {
		await interaction.reply({
			embeds: [new MessageEmbed().setTitle(title).setDescription(description).setColor('RED')],
			ephemeral: isEphemeral || false,
		});
	}
	async start() {
		await this.login(process.env.TOKEN);
	}
}

export default Byte;
