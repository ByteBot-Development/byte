import { readdirSync } from 'fs';
import getFiles from '../functions/getFiles.js';

const commandList: [] = [];

readdirSync('./src/commands').forEach((folder) => {
	getFiles(`./src/commands/${folder}`, '.js').forEach(async (file) => {
		const command: Command = (await import(`../../commands/${folder}/${file}`)).default;
		commandList.push(command);
	});
});

export default commandList;
