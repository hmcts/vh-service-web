import { SubmitService } from './submit.service';
import { IndividualSuitabilityModel } from '../individual-suitability.model';
import { Hearing, SelfTestAnswers } from '../../base-journey/participant-suitability.model';
import { SuitabilityService } from './suitability.service';

describe('SubmitService', () => {
    const suitabilityService = jasmine.createSpyObj<SuitabilityService>(['updateSuitabilityAnswers']);
    const submitService = new SubmitService(suitabilityService);

    const model = new IndividualSuitabilityModel();
    beforeEach(() => {
        model.hearing = new Hearing();
        model.selfTest = new SelfTestAnswers();
        model.selfTest.cameraWorking = true;
        model.selfTest.microphoneWorking = true;
        model.selfTest.seeAndHearClearly = true;
        model.selfTest.checkYourComputer = true;
    });

    it('should call the suitability service to submit answers', async () => {
        await submitService.submit(model);
        expect(suitabilityService.updateSuitabilityAnswers).toHaveBeenCalled();
    });
});
