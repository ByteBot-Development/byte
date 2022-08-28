import { CommandInteractionOptionResolver, Interaction } from 'discord.js';
import { client } from '../index';
import { BaseCommandInteraction } from '../interfaces/Command';
import { Byte } from '../structures/Byte';
import { Event } from '../structures/Event';
import { logger } from '../utils/Logger';

export default new Event('interactionCreate', (interaction: Interaction) => {
  if (interaction.isChatInputCommand())
    return handleCommands(interaction as BaseCommandInteraction);
});

const handleCommands = async (interaction: BaseCommandInteraction) => {
  await interaction.deferReply();

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    return interaction.followUp({
      content: 'Command not found!',
      ephemeral: true,
    });
  }

  const runFunctionParams = {
    client: client as Byte,
    interaction: interaction as BaseCommandInteraction,
    options: interaction.options as CommandInteractionOptionResolver,
  };

  try {
    await command.run(runFunctionParams);
  } catch (err) {
    logger.error(err as string);
  }
};
