import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import {RepresentativeSuitabilityService} from './services/representative-suitability.service';
import {JourneyFactory} from 'src/app/modules/base-journey/services/journey.factory';
import {RepresentativeJourney} from './representative-journey';
import {Injectable} from '@angular/core';
import {JourneyRoutingListenerService} from '../base-journey/services/journey-routing-listener.service';
import {RepresentativeJourneyStepComponentBindings} from './services/representative-journey-component-bindings';
import {RepresentativeJourneyService} from './services/representative.journey.service';
import { ParticipantSuitabilityModel } from '../base-journey/participant-suitability.model';

const RepresentativeUserType = 'Representative';

@Injectable()
export class RepresentativeJourneyFactory implements JourneyFactory {
  private readonly journey: RepresentativeJourney;
  private readonly bindings: RepresentativeJourneyStepComponentBindings;

  constructor(journey: RepresentativeJourney,
              private suitabilityService: RepresentativeSuitabilityService,
              bindings: RepresentativeJourneyStepComponentBindings,
              private journeyRoutingListenerService: JourneyRoutingListenerService,
              private representativeJourneyService: RepresentativeJourneyService) {
    this.journey = journey;
    this.bindings = bindings;
  }

  async begin(): Promise<JourneyBase> {
    this.journey.redirect.subscribe(() =>
      this.representativeJourneyService.set(this.journey.model));

    this.journeyRoutingListenerService.startRouting(this.bindings, this.journey);

    const cachedModel = this.representativeJourneyService.get();
    if (cachedModel === null) {
      const models = await this.suitabilityService.getAllSuitabilityAnswers();
      this.journey.forSuitabilityAnswers(models);
    } else {
      this.journey.continueWithModel(cachedModel);
    }

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
