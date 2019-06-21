import { SubmitService } from './submit.service';
import { MutableIndividualSuitabilityModel } from '../mutable-individual-suitability.model';
import { Hearing } from '../../base-journey/participant-suitability.model';
import { SuitabilityService } from './suitability.service';

describe('SubmitService', () => {
  const suitabilityService = jasmine.createSpyObj<SuitabilityService>(['updateSuitabilityAnswers']);
  const submitService = new SubmitService(suitabilityService);

  const model = new MutableIndividualSuitabilityModel();
  beforeEach(() => {
    model.hearing = new Hearing();
    model.aboutYou.answer = true;
    model.aboutYou.notes = 'notes';
    model.interpreter = false;
    model.computer = true;
    model.camera = 1;
    model.internet = true;
    model.room = true;
    model.consent.answer = true;
    model.consent.notes = 'consent notes';
  });

  it('should call the suitability service to submit answers', async () => {
    await submitService.submit(model);
    expect(suitabilityService.updateSuitabilityAnswers).toHaveBeenCalled();
  });

  it('should clear the answers after the drop off point - access to computer', () => {
    const result = submitService.isDropOffPoint(10, model);
    expect(result).toBe(true);

    expect(model.camera).toBe(undefined);
    expect(model.internet).toBe(undefined);
    expect(model.room).toBe(undefined);
    expect(model.consent.answer).toBe(undefined);
    expect(model.consent.notes).toBe(undefined);

  });
  it('should clear the answers after the drop off point - access to camera', () => {
    const result = submitService.isDropOffPoint(11, model);
    expect(result).toBe(true);

    expect(model.internet).toBe(undefined);
    expect(model.room).toBe(undefined);
    expect(model.consent.answer).toBe(undefined);
    expect(model.consent.notes).toBe(undefined);
  });
  it('should clear the answers after the drop off point - access to internet', () => {
    const result = submitService.isDropOffPoint(12, model);
    expect(result).toBe(true);

    expect(model.room).toBe(undefined);
    expect(model.consent.answer).toBe(undefined);
    expect(model.consent.notes).toBe(undefined);
  });
});
