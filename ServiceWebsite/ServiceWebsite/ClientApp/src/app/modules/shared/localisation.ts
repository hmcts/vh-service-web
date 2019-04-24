/**
 * Defines an interface used to retrieve localisations
 */
export abstract class Localisation {
    /**
     * If current language is not english, get a localised version of the input string
     * @param value The english string to localise, or possibly a short description if the text is long
     * @param identifier An optional identifier that cna be used together with the value to identify a specific localisation
     */
    abstract get(value: string, identifier?: string): string;
}
