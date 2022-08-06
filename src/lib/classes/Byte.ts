import 'dotenv/config';

import { Client, Collection, CommandInteraction, Message, MessageEmbed } from 'discord.js';
import config from '../../config';
import intents from '../constants/intentsList';

class Byte extends Client {
	config: any;
	commands: Collection<unknown, unknown>;
	events: Collection<unknown, unknown>;
	slashcommands: Collection<unknown, unknown>;
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
	async sendError(
		interaction: CommandInteraction | Message,
		title: string,
		description: string,
		isEphemeral: boolean
	) {
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
