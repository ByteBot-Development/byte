import { Event } from '../structures/Event';
import { logger } from '../utils/Logger';

export default new Event('interactionCreate', interaction => {
  logger.info('Hello World!');
});
