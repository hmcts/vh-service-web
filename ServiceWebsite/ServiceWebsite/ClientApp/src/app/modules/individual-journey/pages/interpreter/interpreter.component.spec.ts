import { IndividualJourneyStubs } from './../individual-base-component/individual-component-test-bed.spec';
import { CommonTests } from './../../../base-journey/components/common-tests.spec';
import { InterpreterComponent } from './interpreter.component';
import { IndividualJourneyComponentTestBed } from '../individual-base-component/individual-component-test-bed.spec';

describe('InterpreterComponent', () => {
  it('cannot proceed to next step until pressing choice, after submit value is bound', () => {
    const journey = IndividualJourneyStubs.journeySpy;
    const fixture = IndividualJourneyComponentTestBed.createComponent({
      component: InterpreterComponent,
      journey: journey
    });
    CommonTests.hasErrorUntilChoiceIsSelected(fixture);

    expect(journey.model.interpreter).toBe(true);
    expect(journey.next).toHaveBeenCalled();
  });
});
