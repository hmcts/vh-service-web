import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import {CameraWorkingComponent} from './camera-working.component';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';
import {MutableIndividualSuitabilityModel} from '../../../individual-journey/mutable-individual-suitability.model';
import {SelfTestAnswers} from '../../../base-journey/participant-suitability.model';

describe('CameraWorkingComponent', () => {
  let journey: jasmine.SpyObj<JourneyBase>;
  let model: MutableIndividualSuitabilityModel;

  beforeEach(() => {
    journey = jasmine.createSpyObj<JourneyBase>(['goto', 'submitQuestionnaire']);
    model = new MutableIndividualSuitabilityModel();
    model.selfTest = new SelfTestAnswers();
  });

  it(`should submit and go to ${SelfTestJourneySteps.MicrophoneWorking}`, async () => {
    const component = new CameraWorkingComponent(journey, model);
    component.choice.setValue(true);
    await component.submit();
    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.MicrophoneWorking);
  });

  it(`redirects to ${SelfTestJourneySteps.TestYourEquipment} on clicking on check your equipment again`,  async () => {
    const component = new CameraWorkingComponent(journey, model);
    await component.checkEquipment();
    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.TestYourEquipment);
    expect(journey.submitQuestionnaire).not.toHaveBeenCalled();
  });

  it('should load any previous value', () => {
    model.selfTest.cameraWorking = false;
    const component = new CameraWorkingComponent(journey, model);
    component.ngOnInit();
    expect(component.choice.value).toBe(false);
  });

  it('should not redirect on invalid form', async () => {
    const component = new CameraWorkingComponent(journey, model);
    await component.submit();
    expect(journey.goto).not.toHaveBeenCalled();
  });
});
