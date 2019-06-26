import { SubmitService } from './submit.service';
import { MutableRepresentativeSuitabilityModel } from '../mutable-representative-suitability.model';
import { Hearing, HasAccessToCamera } from '../../base-journey/participant-suitability.model';
import { RepresentativeSuitabilityService } from './representative-suitability.service';
import { RepresentativeJourneySteps } from '../representative-journey-steps';

describe('SubmitService', () => {
  const suitabilityService = jasmine.createSpyObj<RepresentativeSuitabilityService>(['updateSuitabilityAnswers']);
  const submitService = new SubmitService(suitabilityService);

  const model = new MutableRepresentativeSuitabilityModel();
  beforeEach(() => {
    model.hearing = new Hearing();
    model.aboutYou.answer = true;
    model.aboutYou.notes = 'notes';
    model.aboutYourClient.answer = true;
    model.clientAttendance = true;
    model.aboutYourClient.notes = 'notes';
    model.hearingSuitability.answer = true;
    model.hearingSuitability.notes = 'notes';
    model.computer = true;
    model.camera = HasAccessToCamera.Yes;
    model.room = true;
   });

  it('should call the suitability service to submit answers', async () => {
    await submitService.submit(model);
    expect(suitabilityService.updateSuitabilityAnswers).toHaveBeenCalled();
  });

  it('should return true when at a drop off step - access to computer', () => {
    model.computer = false;
    const result = submitService.isDropOffPoint(model);
    expect(result).toBe(true);
  });
  it('should return true when at a drop off step - access to camera', () => {
    model.computer = true;
    model.camera = HasAccessToCamera.No;
    const result = submitService.isDropOffPoint(model);
    expect(result).toBe(true);
  });
  it('should clear the answers after the drop off point - access to computer', () => {
    model.computer = false;
    const saveModel = submitService.updateSubmitModel(RepresentativeJourneySteps.AccessToComputer, model);

    expect(saveModel.camera).toBe(undefined);

  });
});
