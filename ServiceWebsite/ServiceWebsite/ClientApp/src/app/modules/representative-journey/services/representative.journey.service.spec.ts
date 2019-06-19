import {RepresentativeJourneyService} from './representative.journey.service';
import {MutableRepresentativeSuitabilityModel} from '../mutable-representative-suitability.model';
import {HasAccessToCamera, Hearing, SuitabilityAnswer} from '../../base-journey/participant-suitability.model';

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
    model.hearing = new Hearing('hearing1', new Date(2012, 12, 12));
    model.aboutYou = new SuitabilityAnswer();
    model.aboutYou.answer = true;
    model.aboutYou.notes = 'true';
    model.aboutYourClient = new SuitabilityAnswer();
    model.aboutYourClient.answer = true;
    model.aboutYourClient.notes = 'true';
    model.clientAttendance = true;
    model.hearingSuitability = new SuitabilityAnswer();
    model.hearingSuitability.answer = true;
    model.hearingSuitability.notes = 'true';
    model.room = true;
    model.camera = HasAccessToCamera.NotSure;
    model.computer = true;

    representativeJourneyService.set(model);

    const result = representativeJourneyService.get();

    expect(JSON.stringify(result)).toBe(JSON.stringify(model));
  });
});
