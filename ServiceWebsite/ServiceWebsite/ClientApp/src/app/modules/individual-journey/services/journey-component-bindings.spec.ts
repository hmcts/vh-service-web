import { Paths } from '../paths';
import { IndividualJourneySteps } from '../individual-journey';
import { JourneyStepComponentBindings } from './journey-component-bindings';

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
        expect(() => bindings.getRoute(999)).toThrowError('Missing route binding for journey step: undefined');
    });
});
