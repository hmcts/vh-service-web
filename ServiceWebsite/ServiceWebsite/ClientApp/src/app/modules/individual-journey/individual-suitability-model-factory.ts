import { IndividualSuitabilityModel } from './individual-suitability.model';

/**
 * This factory allows us to read in the suitability model either from the user profile or session storage in the future.
 */
const factory = () => {
    return new IndividualSuitabilityModel();
};

export { factory as IndividualSuitabilityModelFactory };
