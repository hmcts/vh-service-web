import {RepresentativeJourneyService} from './representative.journey.service';
import {MutableRepresentativeSuitabilityModel} from '../mutable-representative-suitability.model';
import {HasAccessToCamera, Hearing, SelfTestAnswers} from '../../base-journey/participant-suitability.model';

describe('representative.journey.service', () => {
  let representativeJourneyService: RepresentativeJourneyService;

  beforeEach(() => {
    representativeJourneyService = new RepresentativeJourneyService();
  });

  it('returns null when item not exist', () => {
    expect(representativeJourneyService.get()).toBeNull();
  });

  it('returns the model from storage', () => {
    const model = new MutableRepresentativeSuitabilityModel();
    model.hearing = new Hearing('hearing1', new Date(2012, 12, 12, 12, 15, 11, 23),
      null,
      null,
      false);
    model.camera = HasAccessToCamera.NotSure;
    model.computer = true;

    model.selfTest = new SelfTestAnswers({
      seeAndHearClearly: false,
      checkYourComputer: true,
      cameraWorking: false,
      microphoneWorking: true
    });

    representativeJourneyService.set(model);

    const result = representativeJourneyService.get();

    expect(JSON.stringify(result)).toBe(JSON.stringify(model));
  });
});
