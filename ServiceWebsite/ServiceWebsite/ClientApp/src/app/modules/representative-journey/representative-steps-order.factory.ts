import { Injectable } from '@angular/core';
import { RepresentativeJourneySteps } from './representative-journey-steps';
import { JourneyStep } from '../base-journey/journey-step';

@Injectable()
export class RepresentativeStepsOrderFactory {

  constructor() { }

  stepOrder(): JourneyStep[] {
    return [
      RepresentativeJourneySteps.AboutVideoHearings,
      RepresentativeJourneySteps.AboutYouAndYourClient,
      RepresentativeJourneySteps.AboutYou,
      RepresentativeJourneySteps.AccessToRoom,
      RepresentativeJourneySteps.AboutYourClient,
      RepresentativeJourneySteps.ClientAttendance,
      RepresentativeJourneySteps.HearingSuitability,
      RepresentativeJourneySteps.AccessToComputer,
      RepresentativeJourneySteps.AboutYourComputer,
      RepresentativeJourneySteps.QuestionnaireCompleted,
      RepresentativeJourneySteps.ThankYou,
      RepresentativeJourneySteps.ContactUs,
    ];
  }
}
