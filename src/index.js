import Byte from './lib/classes/Byte.js';
import connectDatabase from './lib/functions/connectDatabase.js';
import handleErrors from './lib/functions/handleErrors.js';
import loadCommands from './lib/functions/loadCommands.js';
import loadEvents from './lib/functions/loadEvents.js';

export const client = (global.client = new Byte());
client.start();

connectDatabase();
loadEvents();
handleErrors(client);
loadCommands();
