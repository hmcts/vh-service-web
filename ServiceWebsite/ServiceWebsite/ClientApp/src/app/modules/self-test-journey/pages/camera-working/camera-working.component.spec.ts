import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import {CameraWorkingComponent} from './camera-working.component';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';
import {IndividualSuitabilityModel} from '../../../individual-journey/individual-suitability.model';
import {Hearing, SelfTestAnswers} from '../../../base-journey/participant-suitability.model';
import {MockLogger} from '../../../../testing/mocks/mock-logger';

describe('CameraWorkingComponent', () => {
  let journey: jasmine.SpyObj<JourneyBase>;
  let model: IndividualSuitabilityModel;

  beforeEach(() => {
    journey = jasmine.createSpyObj<JourneyBase>(['goto', 'submitQuestionnaire']);
    model = new IndividualSuitabilityModel();
    model.hearing = new Hearing('1');
    model.participantId = '2';
    model.selfTest = new SelfTestAnswers();
  });

  it(`should submit and go to ${SelfTestJourneySteps.MicrophoneWorking}`, async () => {
    const component = new CameraWorkingComponent(journey, model, new MockLogger());
    component.choice.setValue(true);
    await component.submit();
    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.MicrophoneWorking);
  });

  it(`redirects to ${SelfTestJourneySteps.TestYourEquipment} on clicking on check your equipment again`,  async () => {
    const component = new CameraWorkingComponent(journey, model, new MockLogger());
    await component.checkEquipment();
    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.TestYourEquipment);
    expect(journey.submitQuestionnaire).not.toHaveBeenCalled();
  });

  it('should load any previous value', () => {
    model.selfTest.cameraWorking = false;
    const component = new CameraWorkingComponent(journey, model, new MockLogger());
    component.ngOnInit();
    expect(component.choice.value).toBe(false);
  });

  it('should not redirect on invalid form', async () => {
    const component = new CameraWorkingComponent(journey, model, new MockLogger());
    await component.submit();
    expect(journey.goto).not.toHaveBeenCalled();
  });
});
