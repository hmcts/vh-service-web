import { JourneyBase } from 'src/app/modules/base-journey/journey-base';

export interface JourneyFactory {
    /**
     * Create a journey for the current user
     * @param username The username for the user to initialise the journey for
     */
    create(username: string): Promise<JourneyBase>;

    /**
     * Checks if the factory applies to users of the given type
     * @param userType Type of user to test if the factory supplies journeys for
     */
    handles(userType: string): boolean;
}
