import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import { MicrophoneWorkingComponent } from './microphone-working.component';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';
import { MutableIndividualSuitabilityModel } from '../../../individual-journey/mutable-individual-suitability.model';
import { SelfTestAnswers } from '../../../base-journey/participant-suitability.model';

describe('MicrophoneWorkingComponent', () => {
  let journey: jasmine.SpyObj<JourneyBase>;
  let model: MutableIndividualSuitabilityModel;

  beforeEach(() => {
    journey = jasmine.createSpyObj<JourneyBase>(['goto', 'submitQuestionnaire']);
    model = new MutableIndividualSuitabilityModel();
    model.selfTest = new SelfTestAnswers();
  });

  it(`should submit and go to ${SelfTestJourneySteps.SeeAndHearVideo}`, async () => {
    const component = new MicrophoneWorkingComponent(journey, model);
    component.choice.setValue(true);
    await component.submit();
    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.SeeAndHearVideo);
  });

  it(`redirects to ${SelfTestJourneySteps.SelfTest} on clicking on check your equipment again`, async () => {
    const component = new MicrophoneWorkingComponent(journey, model);
    await component.checkEquipment();
    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.SelfTest);
    expect(journey.submitQuestionnaire).not.toHaveBeenCalled();
  });

  it('should not redirect on invalid form', async () => {
    const component = new MicrophoneWorkingComponent(journey, model);
    await component.submit();
    expect(journey.goto).not.toHaveBeenCalled();
  });
});
