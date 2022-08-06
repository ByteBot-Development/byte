import Byte from './lib/classes/Byte.js';
import connectDatabase from './lib/functions/connectDatabase.js';
import handleErrors from './lib/functions/handleErrors.js';
import loadCommands from './lib/functions/loadCommands.js';
import loadEvents from './lib/functions/loadEvents.js';

export const client = new Byte();

handleErrors(client);
connectDatabase();
loadEvents();
loadCommands();

client.start();
