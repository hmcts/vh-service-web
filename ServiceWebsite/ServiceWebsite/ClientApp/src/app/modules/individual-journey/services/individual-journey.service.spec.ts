import { SelfTestAnswers } from './../../base-journey/participant-suitability.model';
import { IndividualJourneyService } from './individual-journey.service';
import { MutableIndividualSuitabilityModel } from '../mutable-individual-suitability.model';
import { Hearing, SuitabilityAnswer } from '../../base-journey/participant-suitability.model';
import { HasAccessToCamera } from '../individual-suitability.model';

describe('representative.journey.service', () => {
  let individualJourneyService: IndividualJourneyService;

    beforeEach(() => {
      sessionStorage.clear();
      individualJourneyService = new IndividualJourneyService();
  });

  it('returns null when item not exist', () => {
    expect(individualJourneyService.get()).toBeNull();
  });

  it('returns the model from storage', () => {
    const model = new MutableIndividualSuitabilityModel();
    model.hearing = new Hearing('hearing1', new Date(2012, 12, 12, 12, 15, 11, 23),
      null,
      null,
      true);
    model.aboutYou = new SuitabilityAnswer();
    model.aboutYou.answer = true;
    model.aboutYou.notes = 'true';
    model.consent = new SuitabilityAnswer();
    model.consent.answer = true;
    model.consent.notes = 'true';
    model.internet = true;
    model.interpreter = true;
    model.room = true;
    model.camera = HasAccessToCamera.NotSure;
    model.computer = true;

    model.selfTest = new SelfTestAnswers({
      seeAndHearClearly: true,
      cameraWorking: false,
      checkYourComputer: true,
      microphoneWorking: false
    });

    individualJourneyService.set(model);

    const result = individualJourneyService.get();

    expect(JSON.stringify(result)).toBe(JSON.stringify(model));
  });
});
