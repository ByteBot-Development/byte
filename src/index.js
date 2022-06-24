import Byte from './lib/classes/Byte.js';
import loadCommands from './lib/functions/loadCommands.js';
import loadEvents from './lib/functions/loadEvents.js';

const client = new Byte();

loadEvents(client);
loadCommands(client);

client.start();
