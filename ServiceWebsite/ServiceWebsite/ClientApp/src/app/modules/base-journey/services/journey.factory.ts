import { InjectionToken, Injectable, Inject } from '@angular/core';
import { JourneyBase } from '../journey-base';

export const JOURNEY = new InjectionToken<JourneyBase>('Journey');

@Injectable()
export class JourneyFactory {
    constructor(@Inject(JOURNEY) private journeys: JourneyBase[]) {}

    getJourney(userType: string): JourneyBase {
        const journeys = this.journeys.filter(j => j.handles(userType));
        if (journeys.length === 0) {
            throw new Error(`Found not journeys matching user type: ${userType}`);
        } else if (journeys.length > 1) {
            throw new Error(`Found more than one journey matching user type: ${userType}`);
        }

        return journeys[0];
    }
}
