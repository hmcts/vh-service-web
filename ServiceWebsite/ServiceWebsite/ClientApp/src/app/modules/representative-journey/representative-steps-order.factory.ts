import { Injectable } from '@angular/core';
import { RepresentativeJourneySteps } from './representative-journey-steps';
import { JourneyStep } from '../base-journey/journey-step';
import { SelfTestJourneySteps } from '../self-test-journey/self-test-journey-steps';

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
      SelfTestJourneySteps.SameComputer,
      SelfTestJourneySteps.UseCameraAndMicrophoneAgain,
      SelfTestJourneySteps.SelfTest,
      SelfTestJourneySteps.CameraWorking,
      SelfTestJourneySteps.MicrophoneWorking,
      SelfTestJourneySteps.SeeAndHearVideo,
      RepresentativeJourneySteps.ThankYou,
      RepresentativeJourneySteps.ContactUs,
    ];
  }
}
