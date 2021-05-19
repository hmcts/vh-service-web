import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import { JourneyFactory } from './journey.factory';
import { InjectionToken, Injectable, Inject } from '@angular/core';
import { ParticipantSuitabilityModel } from '../participant-suitability.model';
import { Logger } from 'src/app/services/logger';

export const JOURNEY_FACTORY = new InjectionToken<JourneyFactory>('JourneyFactory');

@Injectable()
export class JourneySelector {
    private currentFactory: JourneyFactory;
    private currentJourney: JourneyBase;
    private readonly loggerPrefix = '[JourneySelector] -';

    constructor(@Inject(JOURNEY_FACTORY) private factories: JourneyFactory[], private logger: Logger) {}

    async beginFor(userType: string): Promise<void> {
        const factory = this.factories.filter(j => j.handles(userType));
        if (factory.length === 0) {
            const error = new Error(`Found no journeys matching user type: ${userType}`);
            this.logger.error(`${this.loggerPrefix} Unable to begin journey`, error, { userType });
            throw error;
        } else if (factory.length > 1) {
            const error = new Error(`Found more than one journey matching user type: ${userType}`);
            this.logger.error(`${this.loggerPrefix} Unable to begin journey`, error, { userType });
            throw error;
        }

        this.currentFactory = factory[0];
        this.logger.info(`${this.loggerPrefix} Starting journey for user ${userType}`);
        this.currentJourney = await this.currentFactory.begin();
    }

    getJourney(): JourneyBase {
        if (!this.currentJourney) {
            const error = new Error(`Journey has not been started yet`);
            this.logger.error(`${this.loggerPrefix} Unable to get journey`, error);
            throw error;
        }
        return this.currentJourney;
    }

    getModel(): ParticipantSuitabilityModel {
        if (!this.currentFactory) {
            const error = new Error('Journey has not been started yet');
            this.logger.error(`${this.loggerPrefix} Unable to get model`, error);
            throw error;
        }
        return this.currentFactory.getModel();
    }
}
