import { CommonTests } from './../../../base-journey/components/suitability-choice-component-fixture.spec';
import { YourInternetConnectionComponent } from './your-internet-connection.component';
import { IndividualJourneyComponentTestBed } from '../individual-base-component/individual-component-test-bed.spec';

describe('InterpreterComponent', () => {
  it('cannot proceed to next step until pressing choice, after submit value is bound', () => {
    const fixture = IndividualJourneyComponentTestBed.createComponent({
      component: YourInternetConnectionComponent
    });

    CommonTests.cannotProceedUntilChoiceIsSelected(fixture);

    // and value is bound
    expect(fixture.componentInstance.model.internet).toBe(true);
  });
});
