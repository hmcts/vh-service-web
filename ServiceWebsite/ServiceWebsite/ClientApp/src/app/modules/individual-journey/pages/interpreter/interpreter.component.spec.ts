import { CommonTests } from 'src/app/modules/base-journey/components/common-tests.spec';
import { InterpreterComponent } from './interpreter.component';
import { IndividualJourneyComponentTestBed } from '../individual-base-component/individual-component-test-bed.spec';

describe('InterpreterComponent', () => {
  it('cannot proceed to next step until pressing choice, after submit value is bound', () => {
    const fixture = IndividualJourneyComponentTestBed.createComponent({component: InterpreterComponent});
    CommonTests.cannotProceedUntilChoiceIsSelected(fixture);

    // and value is bound
    expect(fixture.componentInstance.model.interpreter).toBe(true);
  });
});
