import { Localisation } from '../../shared/localisation';

export class SelfTestLocalisation implements Localisation {
    get(value: string, identifier?: string): string {
        // Localisation can be added in here for required values when required
        return value;
    }
}
