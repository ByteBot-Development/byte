import { Client, Collection } from "discord.js";
import intentsList from "../constants/intentsList";
import config from "../../../conAfig.json";
import "dotenv/config";
const token = process.env.token;

class Byte extends Client {
	constructor() {
		super({ intents: intentsList, allowedMentions: { parse: ["users"] } });
		this.config = config;
		this.commands = new Collection();
		this.events = new Collection();
		this.slashcommands = new Collection();
	}

	async start() {
		await this.login(token);
	}
}

export default Byte;
