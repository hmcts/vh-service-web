import { Localisation } from '../../shared/localisation';

export class IndividualLocalisation implements Localisation {
    get(value: string, identifier?: string): string {
        // for now, do no translation
        return value;
    }
}
