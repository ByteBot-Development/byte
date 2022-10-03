import { MessageEmbed } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders';

const ping = {
	data: new SlashCommandBuilder().setName('ping').setDescription('Returns bot ping.'),
	syntax: `/ping`,
	run(client, interaction) {
    const websocketPing = client.ws.ping;



    const embed = new MessageEmbed()
      .setTitle('Byte\'s Ping Status')
      .setDescription(`Byte\'s enjoying a ${websocketPing}ms API latency!`)
      .setColor('BLURPLE')

    interaction.reply({
      embeds: [
        embed
      ]
    })
	},
};

export default ping;
