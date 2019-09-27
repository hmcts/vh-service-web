import { HasAccessToCamera } from '../../individual-suitability.model';
import { IndividualJourneyStubs } from './../individual-base-component/individual-component-test-bed.spec';
import { AboutYourComputerComponent } from './about-your-computer.component';
import { IndividualJourneyComponentTestBed } from '../individual-base-component/individual-component-test-bed.spec';
import {
  SuitabilityChoiceComponentFixture,
  ChoicePageTests
} from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';
import { IndividualJourneySteps } from '../../individual-journey-steps';

describe('AboutYourComputerComponent', () => {
  it(`cannot proceed to next step until pressing choice, then goes to ${IndividualJourneySteps.YourInternetConnection}`, () => {
    const journey = IndividualJourneyStubs.journeySpy;
    const fixture = IndividualJourneyComponentTestBed.createComponent({
      component: AboutYourComputerComponent,
      journey: journey
    });
    const choiceComponentFixture = new SuitabilityChoiceComponentFixture(fixture);
    const choicePageTests = new ChoicePageTests(choiceComponentFixture, fixture.componentInstance);
    choicePageTests.cannotProceedUntilChoiceIsSelected();

    expect(fixture.componentInstance.model.camera).toBe(0);
    expect(journey.goto).toHaveBeenCalledWith(IndividualJourneySteps.YourInternetConnection);
  });

  it(`should submit and go to ${IndividualJourneySteps.ThankYou} if answering no`, async () => {
    const journey = IndividualJourneyStubs.journeySpy;
    const component = new AboutYourComputerComponent(journey);
    component.choice.setValue(HasAccessToCamera.No);
    await component.submit();
    expect(journey.submitQuestionnaire).toHaveBeenCalled();
    expect(journey.goto).toHaveBeenCalledWith(IndividualJourneySteps.ThankYou);
  });
});
