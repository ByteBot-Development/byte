import { EmbedBuilder } from 'discord.js';
import { Command } from '../../structures/Command';

export default new Command({
  name: 'ping',
  description: 'Pong!',
  run: async ({ interaction, client }) => {
    const websocketPing = client.ws.ping
    
    const embed = new EmbedBuilder()
      .setTitle('Byte\'s ping information')
      .setColor('Green')
      .setDescription(`Byte's enjoying ${websocketPing}ms ping!`)

    await interaction.followUp({
      embeds: [
        embed
      ]
    })
  },
});
