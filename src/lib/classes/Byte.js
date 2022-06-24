import { Client, Collection } from 'discord.js';
import intentsList from '../constants/intentsList.js';
import config from '../../../config.js';
import 'dotenv/config';

class Byte extends Client {
	constructor() {
		super({ intents: intentsList, allowedMentions: { parse: ['users'] } });
		this.config = config;
		this.commands = new Collection();
		this.events = new Collection();
		this.slashcommands = new Collection();
	}

	async start() {
		await this.login(process.env.TOKEN);
	}
	getCommand(commandName) {
		return this.commands.get(commandName);
	}
}

export default Byte;
