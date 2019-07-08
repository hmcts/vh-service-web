import { JourneyStep } from '../base-journey/journey-step';

export class SelfTestJourneySteps {
  static readonly UseCameraAndMicrophoneAgain = new JourneyStep('UseCameraAndMicrophoneAgain');
  static readonly SameComputer = new JourneyStep('SameComputer');
  static readonly SignInOtherComputer = new JourneyStep('SignInOtherComputer');
  static readonly SelfTest = new JourneyStep('SelfTest');
  static readonly CameraWorking = new JourneyStep('CameraWorking');
  static readonly MicrophoneWorking = new JourneyStep('MicrophoneWorking');
  static readonly SeeAndHearVideo = new JourneyStep('SeeAndHearVideo');

  static GetAll(): JourneyStep[] {
    return [
      this.UseCameraAndMicrophoneAgain,
      this.SameComputer,
      this.SignInOtherComputer,
      this.SelfTest,
      this.CameraWorking,
      this.MicrophoneWorking,
      this.SeeAndHearVideo
    ];
  }
}
