import 'dotenv/config';

import { Client, Collection, Interaction, MessageEmbed } from 'discord.js';
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

	/**
	 * Get Methods
	 */

	get id() {
		return this.user.id;
	}
	get username() {
		return this.user.username;
	}
	get usertag() {
		return this.user.tag;
	}
	get ping() {
		return this.ws.ping;
	}

	/**
	 * @param {Interaction} interaction
	 * @param {string} title
	 * @param {string} description
	 * @param {boolean} isEphemeral
	 */
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
