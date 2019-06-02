import { Paths } from '../paths';
import { RepresentativeJourneySteps } from '../representative-journey-steps';
import { RepresentativeJourneyStepComponentBindings } from './representative-journey-component-bindings';

describe('RepresentativeJourneyStepComponentBindings', () => {
    const bindings: RepresentativeJourneyStepComponentBindings = new RepresentativeJourneyStepComponentBindings();

    it('returns null if no mapping exists for a path', () => {
        expect(bindings.getJourneyStep('missing-path')).toBeNull();
    });

    it('returns a journey step for a given path', () => {
        expect(bindings.getJourneyStep(Paths.AboutVideoHearings)).toBe(RepresentativeJourneySteps.AboutVideoHearings);
    });

    it('should return a path for a given step', () => {
        expect(bindings.getRoute(RepresentativeJourneySteps.AboutVideoHearings)).toBe(Paths.AboutVideoHearings);
    });

    it('should throw an exception if no route binding exists for a given step', () => {
        expect(() => bindings.getRoute(999)).toThrowError('Missing route binding for journey step: undefined');
    });
});
