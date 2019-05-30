import { Injectable } from '@angular/core';
import { RepresentativeJourneySteps } from './representative-journey-steps';

@Injectable()
export class RepresentativeStepsOrderFactory {

  constructor() { }

  stepOrder(): RepresentativeJourneySteps[] {
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
      RepresentativeJourneySteps.ContactUs,
      RepresentativeJourneySteps.ThankYou
    ];
  }
}
