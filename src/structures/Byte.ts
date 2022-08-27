import 'dotenv/config';

import { Client, ClientEvents, Collection, IntentsBitField } from 'discord.js';
import glob, { sync } from 'glob';
import { promisify } from 'util';
import { Event } from './Event';

const token = process.env.TOKEN;
const intents = [
  IntentsBitField.Flags.Guilds,
  IntentsBitField.Flags.GuildMembers,
  IntentsBitField.Flags.GuildMessages,
];

export class Byte extends Client {
  commands: Collection<any, any>;
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
    await this.login(token);
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
    const globPromise = promisify(glob);
    const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`);

    eventFiles.forEach(async path => {
      const event: Event<keyof ClientEvents> = await this.importFile(path);
      console.log(event.run);
      this.on(event.event, event.run);
    });
  }
}
