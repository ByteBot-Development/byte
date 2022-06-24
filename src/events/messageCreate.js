import Event from '../lib/classes/Event.js';

class MessageCreate extends Event {
	async run(message) {
		if (!message.content.startsWith(this.client.config.prefix)) return;

		const commandName = message.content.replace(this.client.config.prefix, '');
		const command = this.client.getCommand(commandName);

		if (command) {
			try {
				command.run(message);
			} catch (error) {
				console.error(error);
			}
		}
	}
}

export default MessageCreate;
