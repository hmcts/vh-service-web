import { MutableIndividualSuitabilityModel } from './mutable-individual-suitability.model';

/**
 * This factory allows us to read in the suitability model either from the user profile or session storage in the future.
 */
const factory = () => {
    return new MutableIndividualSuitabilityModel();
};

export { factory as IndividualSuitabilityModelFactory };
