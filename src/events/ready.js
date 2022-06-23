import Event from '../lib/classes/Event.js';

class Ready extends Event {
	async run() {
		console.log(`Connected to Discord via ${this.client.user.tag}!`);
	}
}

export default Ready;
