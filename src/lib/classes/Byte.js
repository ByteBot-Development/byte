import { Client, Collection } from 'discord.js';
import intentsList from '../constants/intentsList.js';
import config from '../../../config.js';
import getFiles from '../functions/getFiles.js';
import 'dotenv/config';

const token = process.env.token;
// const __dirname = dirname(fileURLToPath(import.meta.url));

class Byte extends Client {
	constructor() {
		super({ intents: intentsList, allowedMentions: { parse: ['users'] } });
		this.config = config;
		this.commands = new Collection();
		this.events = new Collection();
		this.slashcommands = new Collection();
	}

	async start() {
		await this.login(token);
	}

	async loadEvents() {
		getFiles(`./src/events`, '.js').forEach(async (fileName) => {
			const eventName = fileName.split('.js')[0];
			const Event = (await import(`../../events/${fileName}`)).default;
			const event = new Event(this, eventName);
			event.startListener();
			this.events.set(eventName, event);
		});
	}
}

export default Byte;
