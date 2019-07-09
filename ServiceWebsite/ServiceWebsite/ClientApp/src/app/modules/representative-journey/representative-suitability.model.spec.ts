import { MutableRepresentativeSuitabilityModel } from './mutable-representative-suitability.model';
import { SelfTestAnswers } from '../base-journey/participant-suitability.model';

describe('RepresentativeSuitabilityModel', () => {
    it('is completed if not having access to a computer', () => {
        const model = new MutableRepresentativeSuitabilityModel();
        model.aboutYou.answer = false;
        model.aboutYourClient.answer = false;
        model.clientAttendance = false;
        model.hearingSuitability.answer = false;
        model.room = true;
        model.selfTest = new SelfTestAnswers();
        model.computer = false;

        expect(model.isCompleted()).toBe(true);
    });

    it('is completed if selftest is completed', () => {
        const model = new MutableRepresentativeSuitabilityModel();
        model.aboutYou.answer = false;
        model.aboutYourClient.answer = false;
        model.clientAttendance = false;
        model.hearingSuitability.answer = false;
        model.room = true;
        model.computer = true;
        model.selfTest = new SelfTestAnswers({
            cameraWorking: true,
            seeAndHearClearly: true,
            sameComputer: true,
            microphoneWorking: true
        });

        expect(model.isCompleted()).toBe(true);
    });
});
