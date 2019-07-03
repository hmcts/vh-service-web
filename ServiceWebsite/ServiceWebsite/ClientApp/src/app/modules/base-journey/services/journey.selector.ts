import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import { JourneyFactory } from './journey.factory';
import { InjectionToken, Injectable, Inject } from '@angular/core';
import { ParticipantSuitabilityModel } from '../participant-suitability.model';

export const JOURNEY_FACTORY = new InjectionToken<JourneyFactory>('JourneyFactory');

@Injectable()
export class JourneySelector {
    private currentFactory: JourneyFactory;
    private currentJourney: JourneyBase;

    constructor(@Inject(JOURNEY_FACTORY) private factories: JourneyFactory[]) {}

    async beginFor(userType: string): Promise<void> {
        const factory = this.factories.filter(j => j.handles(userType));
        if (factory.length === 0) {
            throw new Error(`Found no journeys matching user type: ${userType}`);
        } else if (factory.length > 1) {
            throw new Error(`Found more than one journey matching user type: ${userType}`);
        }

        this.currentFactory = factory[0];
        this.currentJourney = await this.currentFactory.begin();
    }

    getJourney(): JourneyBase {
        return this.currentJourney;
    }

    getModel(): ParticipantSuitabilityModel {
        return this.currentFactory.getModel();
    }
}
