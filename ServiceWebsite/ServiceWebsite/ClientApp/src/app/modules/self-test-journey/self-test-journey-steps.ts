import { JourneyStep } from '../base-journey/journey-step';

export class SelfTestJourneySteps {
  static readonly SwitchOnCameraAndMicrophone = new JourneyStep('SwitchOnCameraAndMicrophone');
  static readonly CheckYourComputer = new JourneyStep('CheckYourComputer');
  static readonly SignBackIn = new JourneyStep('SignBackIn');
  static readonly SignInOnComputer = new JourneyStep('SignInOnComputer');
  static readonly TestYourEquipment = new JourneyStep('TestYourEquipment');
  static readonly CameraWorking = new JourneyStep('CameraWorking');
  static readonly MicrophoneWorking = new JourneyStep('MicrophoneWorking');
  static readonly SeeAndHearVideo = new JourneyStep('SeeAndHearVideo');

  static GetAll(): JourneyStep[] {
    return [
      this.SwitchOnCameraAndMicrophone,
      this.CheckYourComputer,
      this.SignBackIn,
      this.SignInOnComputer,
      this.TestYourEquipment,
      this.CameraWorking,
      this.MicrophoneWorking,
      this.SeeAndHearVideo
    ];
  }
}
