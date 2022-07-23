import { Client, Collection, MessageEmbed } from 'discord.js';
import intentsList from '../constants/intentsList.js';
import config from '../../../config.js';
import 'dotenv/config';
import partials from '../constants/partials.js';

class Byte extends Client {
	constructor() {
		super({
			intents,
			partials,
			allowedMentions: { parse: ['users'] },
		});
		this.config = config;
		this.commands = new Collection();
		this.events = new Collection();
		this.slashcommands = new Collection();
	}
	async sendError(interaction, title, description) {
		await interaction.reply({
			embeds: [new MessageEmbed().setTitle(title).setDescription(description).setColor('RED')],
			ephemeral: true,
		});
	}
	async start() {
		await this.login(process.env.TOKEN);
	}
}

export default Byte;
