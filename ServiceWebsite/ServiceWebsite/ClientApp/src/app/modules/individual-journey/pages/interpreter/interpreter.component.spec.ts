import { CommonTests } from 'src/app/modules/base-journey/components/common-tests.spec';
import { InterpreterComponent } from './interpreter.component';
import { IndividualJourneyComponentTestBed, IndividualJourneyStubs } from '../individual-base-component/individual-component-test-bed.spec';
import { IndividualJourneySteps } from '../../individual-journey-steps';
import { BackNavigationStubComponent } from '../../../../testing/stubs/back-navigation-stub';

describe('InterpreterComponent', () => {
  it(`cannot proceed to next step until pressing choice, then goes to ${IndividualJourneySteps.AccessToComputer}`, () => {
    const journey = IndividualJourneyStubs.journeySpy;
    const fixture = IndividualJourneyComponentTestBed.createComponent({
      component: InterpreterComponent,
      declarations: [BackNavigationStubComponent],
      journey: journey
    });
    CommonTests.cannotProceedUntilChoiceIsSelected(fixture);

    expect(journey.model.interpreter).toBe(true);
    expect(journey.goto).toHaveBeenCalledWith(IndividualJourneySteps.AccessToComputer);
  });
});
