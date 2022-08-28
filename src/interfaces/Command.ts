import {
  ChatInputApplicationCommandData,
  CommandInteraction,
  CommandInteractionOptionResolver,
  GuildMember,
} from 'discord.js';
import { Byte } from '../structures/Byte';

interface RunFunctionParams {
  client: Byte;
  interaction: BaseCommandInteraction;
  options: CommandInteractionOptionResolver;
}
interface CommandSettings {
  ownerOnly: boolean;
}

export interface CommandType extends ChatInputApplicationCommandData {
  run: (options: RunFunctionParams) => Promise<void>;
  settings?: CommandSettings;
}

export interface BaseCommandInteraction extends CommandInteraction {
  member: GuildMember;
}
