import Byte from './lib/classes/Byte.js';
import loadCommands from './lib/functions/loadCommands.js';
import loadEvents from './lib/functions/loadEvents.js';
import connectDatabase from './lib/functions/connectDatabase.js';
import handleErrors from './lib/functions/handleErrors.js';

export const client = (global.client = new Byte())

connectDatabase();
loadEvents();
handleErrors(client)
loadCommands();
client.start();
