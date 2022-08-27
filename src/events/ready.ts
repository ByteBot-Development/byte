import { Event } from '../structures/Event';
import { logger } from '../utils/Logger';

export default new Event('ready', () => {
  logger.success('Bot is ready!');
});
