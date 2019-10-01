import { IndividualJourneyStubs } from './../individual-base-component/individual-component-test-bed.spec';
import { IndividualJourneySteps } from './../../individual-journey-steps';
import { CommonTests } from './../../../base-journey/components/common-tests.spec';
import { YourInternetConnectionComponent } from './your-internet-connection.component';
import { IndividualJourneyComponentTestBed } from '../individual-base-component/individual-component-test-bed.spec';
import { BackNavigationStubComponent } from '../../../../testing/stubs/back-navigation-stub';

describe('InterpreterComponent', () => {
  it(`cannot proceed to next step until pressing choice, then goes to ${IndividualJourneySteps.AccessToRoom}`, () => {
    const fixture = IndividualJourneyComponentTestBed.createComponent({
      component: YourInternetConnectionComponent,
      declarations:[BackNavigationStubComponent]
    });

    CommonTests.cannotProceedUntilChoiceIsSelected(fixture);

    // and value is bound
    expect(fixture.componentInstance.model.internet).toBe(true);
  });

  it(`should submit questionnaire and go to ${IndividualJourneySteps.ThankYou} if not having internet connection`, async () => {
    const journey = IndividualJourneyStubs.journeySpy;
    const component = new YourInternetConnectionComponent(journey);

    component.choice.setValue(false);
    await component.submit();
    expect(journey.goto).toHaveBeenCalledWith(IndividualJourneySteps.ThankYou);
    expect(journey.submitQuestionnaire).toHaveBeenCalled();
  });
});
