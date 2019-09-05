import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import { VideoWorkingComponent } from './video-working.component';
import { ParticipantJourneySteps } from 'src/app/modules/base-journey/participant-journey-steps';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';
import { MutableIndividualSuitabilityModel } from '../../../individual-journey/mutable-individual-suitability.model';
import {Hearing, SelfTestAnswers} from '../../../base-journey/participant-suitability.model';
import {MockLogger} from '../../../../testing/mocks/mock-logger';

describe('VideoWorkingComponent', () => {
  let journey: jasmine.SpyObj<JourneyBase>;
  let model: MutableIndividualSuitabilityModel;

  beforeEach(() => {
    journey = jasmine.createSpyObj<JourneyBase>(['goto', 'submitQuestionnaire']);
    model = new MutableIndividualSuitabilityModel();
    model.hearing = new Hearing('1');
    model.participantId = '2';
    model.selfTest = new SelfTestAnswers();
  });

it(`submits and goes to ${ParticipantJourneySteps.ThankYou} on continuing`, async () => {
    const component = new VideoWorkingComponent(journey, model, new MockLogger());
    component.choice.setValue(true);
    await component.submit();
    expect(journey.goto).toHaveBeenCalledWith(ParticipantJourneySteps.ThankYou);
    expect(journey.submitQuestionnaire).toHaveBeenCalled();
  });

  it(`redirects to ${SelfTestJourneySteps.TestYourEquipment} on clicking on check your equipment again`,  async () => {
    const component = new VideoWorkingComponent(journey, model, new MockLogger());
    await component.checkEquipment();
    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.TestYourEquipment);
    expect(journey.submitQuestionnaire).not.toHaveBeenCalled();
  });

  it('should load any previous value', () => {
    model.selfTest.seeAndHearClearly = true;
    const component = new VideoWorkingComponent(journey, model, new MockLogger());
    component.ngOnInit();
    expect(component.choice.value).toBe(true);
  });

  it('should not redirect on invalid form', async () => {
    const component = new VideoWorkingComponent(journey, model, new MockLogger());
    await component.submit();
    expect(journey.goto).not.toHaveBeenCalled();
  });
});
