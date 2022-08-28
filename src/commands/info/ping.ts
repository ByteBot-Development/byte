import { Command } from '../../structures/Command';

export default new Command({
  name: 'ping',
  description: 'Pong!',
  run: async ({ interaction }) => {
    await interaction.followUp('Pong!');
  },
});
