import { ConsoleLogger } from './console-logger';

describe('ConsoleLogger', () => {
  const logger: ConsoleLogger = new ConsoleLogger();

  it('can log events with properties', () => {
    logger.trackEvent('testEvent', { property: 'value' });
  });

  it('can log error', () => {
    logger.trackException('error', new Error('error'));
  });

  it('can log error with propeerties', () => {
    logger.trackException('error', new Error('error'), { property: 'value' });
  });
});
