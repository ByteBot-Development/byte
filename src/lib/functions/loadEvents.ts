import getFiles from './getFiles.js';
import { client } from '../../index.js';

async function loadEvents() {
	getFiles(`./src/events`, '.js').forEach(async (fileName) => {
		const eventName = fileName.split('.js')[0];
		const Event = (await import(`../../events/${fileName}`)).default;
		const event = new Event(client, eventName);
		event.startListener();
		client.events.set(eventName, event);
	});
}

export default loadEvents;
