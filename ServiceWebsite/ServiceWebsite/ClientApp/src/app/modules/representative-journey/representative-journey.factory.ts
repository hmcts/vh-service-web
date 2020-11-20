import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import { JourneyFactory } from 'src/app/modules/base-journey/services/journey.factory';
import { Injectable } from '@angular/core';
import { JourneyRoutingListenerService } from '../base-journey/services/journey-routing-listener.service';
import { RepresentativeJourneyStepComponentBindings } from './services/representative-journey-component-bindings';
import { RepresentativeJourneyService } from './services/representative.journey.service';
import { ParticipantSuitabilityModel } from '../base-journey/participant-suitability.model';
import { ParticipantJourney } from 'src/app/modules/base-journey/participant-journey';
import { SuitabilityService } from '../base-journey/services/suitability.service';
const RepresentativeUserType = 'Representative';

@Injectable()
export class RepresentativeJourneyFactory implements JourneyFactory {
    private readonly journey: ParticipantJourney;
    private readonly bindings: RepresentativeJourneyStepComponentBindings;

    constructor(
        journey: ParticipantJourney,
        private suitabilityService: SuitabilityService,
        bindings: RepresentativeJourneyStepComponentBindings,
        private journeyRoutingListenerService: JourneyRoutingListenerService,
        private representativeJourneyService: RepresentativeJourneyService
    ) {
        this.journey = journey;
        this.journey.journeyName = RepresentativeUserType;
        this.bindings = bindings;
    }

    async begin(): Promise<JourneyBase> {
        this.journey.redirect.subscribe(() => this.representativeJourneyService.set(this.journey.model));

        let models: ParticipantSuitabilityModel[] = [];

        const cachedModel = this.representativeJourneyService.get();
        if (cachedModel === null) {
            models = await this.suitabilityService.getAllSuitabilityAnswers();
        } else {
            models.push(cachedModel);
        }

        this.journeyRoutingListenerService.startRouting(this.bindings, this.journey);
        this.journey.forSuitabilityAnswers(models);
        this.journeyRoutingListenerService.startJourneyAtCurrentRoute();

        return Promise.resolve(this.journey);
    }

    handles(userType: string): boolean {
        return userType === RepresentativeUserType;
    }

    getModel(): ParticipantSuitabilityModel {
        return this.journey.model;
    }
}
