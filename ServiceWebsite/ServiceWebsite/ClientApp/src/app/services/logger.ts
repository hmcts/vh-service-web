/**
 * Application wide logger abstracting where logs end up.
 */
export abstract class Logger {
    abstract error(message: string, err: Error, properties?: any): void;
    abstract event(event: string, properties?: any): void;
}
