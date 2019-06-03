import { MutableRepresentativeSuitabilityModel } from './mutable-representative-suitability.model';

/**
 * This factory allows us to read in the suitability model either from the user profile or session storage in the future.
 */
const factory = () => {
    return new MutableRepresentativeSuitabilityModel();
};

export { factory as RepresentativeSuitabilityModelFactory };
