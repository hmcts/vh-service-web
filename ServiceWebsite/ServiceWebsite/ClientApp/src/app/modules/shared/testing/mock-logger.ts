/* tslint:disable */
/* eslint-disable */

import { Logger } from 'src/app/services/logger';

export class MockLogger implements Logger {
    flushBuffer() {}
    warn(message: string): void {}
    debug(message: string): void {}
    info(message: string): void {}
    event(event: string, properties?: any): void {}
    error(message: string, err: Error, properties?: any): void {}
}
