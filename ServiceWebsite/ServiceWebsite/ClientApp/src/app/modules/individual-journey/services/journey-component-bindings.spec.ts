import { Paths } from '../paths';
import { ParticipantJourneySteps } from '../../base-journey/participant-journey-steps';
import { JourneyStepComponentBindings } from './journey-component-bindings';
import { JourneyStep } from '../../base-journey/journey-step';
import { SelfTestJourneyStepComponentBindings } from '../../self-test-journey/self-test-journey-component-bindings';

describe('JourneyStepComponentBindings', () => {
    const bindings: JourneyStepComponentBindings = new JourneyStepComponentBindings(new SelfTestJourneyStepComponentBindings());

    it('returns null if no mapping exists for a path', () => {
        expect(bindings.getJourneyStep('missing-path')).toBeNull();
    });

    it('returns a journey step for a given path', () => {
        expect(bindings.getJourneyStep(Paths.ChekingVideoHearing)).toBe(ParticipantJourneySteps.CheckingVideoHearing);
    });

    it('should return a path for a given step', () => {
        expect(bindings.getRoute(ParticipantJourneySteps.CheckingVideoHearing)).toBe(Paths.ChekingVideoHearing);
    });

    it('should throw an exception if no route binding exists for a given step', () => {
        const undefinedStep = 'Undefined Step';
        expect(() => bindings.getRoute(new JourneyStep(undefinedStep))).toThrowError(
            'Missing route binding for journey step: ' + undefinedStep
        );
    });
});
