import 'dotenv/config';

import { Client, ClientEvents, Collection, IntentsBitField } from 'discord.js';
import { sync } from 'glob';
import { CommandRegisterParams } from '../interfaces/Client';
import { CommandType } from '../interfaces/Command';
import { logger } from '../utils/Logger';
import { Event } from './Event';

const token = process.env.TOKEN;
const testGuildId = process.env.TEST_GUILD_ID;
const intents = [
  IntentsBitField.Flags.Guilds,
  IntentsBitField.Flags.GuildMembers,
  IntentsBitField.Flags.GuildMessages,
];

export class Byte extends Client {
  commands: Collection<string, CommandType>;
  constructor() {
    super({
      intents,
    });
    this.commands = new Collection();
  }

  /**
   * Get Methods
   */
  get id(): string {
    return `${this.user?.id}`;
  }
  get username(): string {
    return `${this.user?.username}`;
  }
  get usertag(): string {
    return `${this.user?.tag}`;
  }
  get avatarURL(): string {
    return `${this.user?.displayAvatarURL()}`;
  }

  /**
   * Initilization
   */
  async build() {
    this.loadEvents();
    await this.login(token).catch((err) => logger.error(err));
    this.loadCommands();
  }
  async init() {
    await this.login(token);
  }

  /**
   * Helper function
   */
  async importFile(path: string) {
    return (await import(path))?.default;
  }

  /**
   * loader
   */
  async loadEvents() {
    const eventFiles = sync(`${__dirname}/../events/*{.ts,.js}`);

    eventFiles.forEach(async (path) => {
      const event: Event<keyof ClientEvents> = await this.importFile(path);
      this.on(event.event, event.run);
    });
  }
  async loadCommands() {
    const commandList: CommandType[] = [];
    const commandFiles = sync(`${__dirname}/../commands/*/*{.ts,.js}`);

    commandFiles.forEach(async (filePath) => {
      const command: CommandType = await this.importFile(filePath);

      if (!command.name) {
        return logger.error("One of the commands doesn't have a name!");
      }
      if (!command.description) {
        return logger.error(
          `Command "${command.name}" doesn't have a description!`
        );
      }

      this.commands.set(command.name, command);
      commandList.push(command);
      this.registerCommands({
        commands: commandList,
        guildId: testGuildId,
      });
    });
  }

  async registerCommands({ commands, guildId }: CommandRegisterParams) {
    if (guildId) {
      const guild = this.guilds.cache.get(guildId);

      if (!guild) {
        return logger.error(`Given guildId (${guildId}) doesn't exist!`);
      }

      logger.info(
        `Registering ${commands.length} application (/) commands to ${guild.name} (${guildId})...`
      );
      await guild.commands.set(commands);

      return logger.success(
        `Registered ${commands.length} application (/) commands to ${guild.name} (${guildId})...`
      );
    }

    logger.info(
      `Registering ${commands.length} application (/) commands globally...`
    );
    await this.application?.commands.set(commands);
    logger.success(
      `Registered ${commands.length} application (/) commands globally!`
    );
  }
}
