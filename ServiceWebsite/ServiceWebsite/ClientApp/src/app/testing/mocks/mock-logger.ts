import { Logger } from '../../services/logger';

export class MockLogger implements Logger {
    event(event: string, properties?: any): void {}
    error(message: string, err: Error, properties?: any): void {}
}
