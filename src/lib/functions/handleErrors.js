import { MessageEmbed } from 'discord.js';
import { inspect } from 'util';
async function handleErrors(client) {
	let guild = await client.guilds.fetch(`949757251596451891`);
	let channel = await guild.channels.fetch(`1004358056529899632`);
	process.on('uncaughtException', (err, origin) => {
		channel.send({
			embeds: [
				new MessageEmbed()
					.setTitle(`Ran into an ${err.name}`)
					.setDescription(`${err.stack.slice(0, 4096)}`)
					.addField(`Originated at`, `${origin}`)
                    .setColor(`RED`)
			],
		});
	});
	process.on('unhandledRejection', (reason, p) => {
		channel.send({
			embeds: [
				new MessageEmbed()
					.setTitle(`Ran into an unhandledRejection`)
					.setDescription(`${reason.stack}`)
					.addField(`Originated at`, `${inspect(p)}`)
                    .setColor(`RED`)
			],
		});
	});
	process.on('uncaughtExceptionMonitor', (err, origin) => {
		channel.send({
			embeds: [
				new MessageEmbed()
					.setTitle(`Ran into an ${err.name}`)
					.setDescription(`${err.stack.slice(0, 4096)}`)
					.addField(`Originated at`, `${origin}`)
                    .setColor(`RED`)
			],
		});
	});
}

export default handleErrors;
