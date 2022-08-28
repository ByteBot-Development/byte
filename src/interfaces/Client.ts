import { ApplicationCommandDataResolvable } from 'discord.js';
export interface CommandRegisterParams {
  commands: ApplicationCommandDataResolvable[];
  guildId?: string;
}
