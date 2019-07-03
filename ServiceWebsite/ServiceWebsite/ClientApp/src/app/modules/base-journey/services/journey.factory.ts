import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import { ParticipantSuitabilityModel } from '../participant-suitability.model';

export interface JourneyFactory {
    /**
     * Begin the journey
     */
    begin(): Promise<JourneyBase>;

    /**
     * Checks if the factory applies to users of the given type
     * @param userType Type of user to test if the factory supplies journeys for
     */
    handles(userType: string): boolean;

    /**
     * Get the current journey participant model
     */
    getModel(): ParticipantSuitabilityModel;
}
