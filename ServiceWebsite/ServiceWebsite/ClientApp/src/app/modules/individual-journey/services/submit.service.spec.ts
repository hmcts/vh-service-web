import { SubmitService } from './submit.service';
import { MutableIndividualSuitabilityModel } from '../mutable-individual-suitability.model';
import { Hearing } from '../../base-journey/participant-suitability.model';

describe('SubmitService', () => {
  const submitService = jasmine.createSpyObj<SubmitService>(['submit']);
  const model = new MutableIndividualSuitabilityModel();
  model.hearing = new Hearing();
  it('should call the suitability service to submit answers', async () => {
    await submitService.submit(model);
    expect(submitService.submit).toHaveBeenCalled();
  });
});
