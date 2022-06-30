import Event from '../lib/classes/Event.js';

class MessageCreate extends Event {
	async run(message) {
		if (message.author.bot) return;
		const prefix = '--';
		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const cmd = args.shift().toLowerCase();

		if (cmd === 'blacklist') {
			blacklist(this.client, message);
		}
	}
}

export default MessageCreate;

function blacklist(client, message) {}
