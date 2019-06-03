import { Paths } from '../paths';
import { IndividualJourneySteps } from '../individual-journey-steps';
import { JourneyStepComponentBindings } from './journey-component-bindings';
import { JourneyStep } from '../../base-journey/journey-step';

describe('JourneyStepComponentBindings', () => {
    const bindings: JourneyStepComponentBindings = new JourneyStepComponentBindings();

    it('returns null if no mapping exists for a path', () => {
        expect(bindings.getJourneyStep('missing-path')).toBeNull();
    });

    it('returns a journey step for a given path', () => {
        expect(bindings.getJourneyStep(Paths.AboutHearings)).toBe(IndividualJourneySteps.AboutHearings);
    });

    it('should return a path for a given step', () => {
        expect(bindings.getRoute(IndividualJourneySteps.AboutHearings)).toBe(Paths.AboutHearings);
    });

    it('should throw an exception if no route binding exists for a given step', () => {
        const undefinedStep = 'Undefined Step';
        expect(() => bindings.getRoute(new JourneyStep(undefinedStep))).toThrowError('Missing route binding for journey step: ' +undefinedStep);
    });
});
