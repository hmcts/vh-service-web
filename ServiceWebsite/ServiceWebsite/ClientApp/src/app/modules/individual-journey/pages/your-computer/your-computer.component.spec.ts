import { CommonTests } from 'src/app/modules/base-journey/components/common-tests.spec';
import { YourComputerComponent } from './your-computer.component';
import { IndividualJourneyComponentTestBed, IndividualJourneyStubs } from '../individual-base-component/individual-component-test-bed.spec';
import { IndividualJourneySteps } from '../../individual-journey-steps';
import { BackNavigationStubComponent } from '../../../../testing/stubs/back-navigation-stub';

describe('YourComputerComponent', () => {

  it(`cannot proceed to next step until pressing choice, then goes to ${IndividualJourneySteps.AboutYourComputer}`, () => {
    const journey = IndividualJourneyStubs.journeySpy;
    const fixture = IndividualJourneyComponentTestBed.createComponent({
      component: YourComputerComponent,
      declarations: [BackNavigationStubComponent],
      journey: journey
    });

    CommonTests.cannotProceedUntilChoiceIsSelected(fixture);

    expect(fixture.componentInstance.model.computer).toBe(true);
    expect(journey.goto).toHaveBeenCalledWith(IndividualJourneySteps.AboutYourComputer);
  });

  it(`should drop off to ${IndividualJourneySteps.ThankYou} if not having access to computer`, async () => {
    const journey = IndividualJourneyStubs.journeySpy;
    const component = new YourComputerComponent(journey);

    component.choice.setValue(false);
    await component.submit();
    expect(journey.goto).toHaveBeenCalledWith(IndividualJourneySteps.ThankYou);
    expect(journey.submitQuestionnaire).toHaveBeenCalled();
  });

  it('should contain the scheduled date on init', () => {
    const component = new YourComputerComponent(IndividualJourneyStubs.default);
    component.ngOnInit();
    expect(component.hearingDate).not.toBe(null);
  });
});
