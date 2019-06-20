import { SubmitService } from './submit.service';
import { MutableIndividualSuitabilityModel } from '../mutable-individual-suitability.model';
import { Hearing } from '../../base-journey/participant-suitability.model';
import { SuitabilityService } from './suitability.service';

describe('SubmitService', () => {
  const suitabilityService = jasmine.createSpyObj<SuitabilityService>(['updateSuitabilityAnswers']);
  const model = new MutableIndividualSuitabilityModel();
  model.hearing = new Hearing();
  const submitService =  new SubmitService(suitabilityService);

  it('should call the suitability service to submit answers', async () => {
    await submitService.submit(model);
    expect(suitabilityService.updateSuitabilityAnswers).toHaveBeenCalled();
  });
});
