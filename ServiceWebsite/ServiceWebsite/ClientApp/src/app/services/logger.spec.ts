import { ConsoleLogger } from './console-logger';
import { LoggerService } from 'src/app/services/logger.service';

/** Logger to use in tests */
export const TestLogger = new LoggerService([new ConsoleLogger()]);
