import { JourneyFactory } from './journey.factory';
import { InjectionToken, Injectable, Inject } from '@angular/core';

export const JOURNEY_FACTORY = new InjectionToken<JourneyFactory>('JourneyFactory');

@Injectable()
export class JourneySelector {
    constructor(@Inject(JOURNEY_FACTORY) private factories: JourneyFactory[]) {}

    beginFor(userType: string): Promise<void> {
        const factory = this.factories.filter(j => j.handles('xxx'));
        if (factory.length === 0) {
            throw new Error(`Found no journeys matching user type: ${userType}`);
        } else if (factory.length > 1) {
            throw new Error(`Found more than one journey matching user type: ${userType}`);
        }

        return factory[0].begin();
    }
}
