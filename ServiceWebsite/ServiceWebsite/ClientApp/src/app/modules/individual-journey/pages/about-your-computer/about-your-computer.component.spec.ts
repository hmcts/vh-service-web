import { AboutYourComputerComponent } from './about-your-computer.component';
import { IndividualJourneyComponentTestBed } from '../individual-base-component/individual-component-test-bed.spec';
import {
  SuitabilityChoiceComponentFixture,
  ChoicePageTests
} from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';

describe('AboutYourComputerComponent', () => {
  it('cannot proceed to next step until pressing choice, after submit value is bound', () => {
    const fixture = IndividualJourneyComponentTestBed.createComponent({component: AboutYourComputerComponent});
    const choiceComponentFixture = new SuitabilityChoiceComponentFixture(fixture);
    const choicePageTests = new ChoicePageTests(choiceComponentFixture, fixture.componentInstance);
    choicePageTests.cannotProceedUntilChoiceIsSelected();

    // and value is bound
    expect(fixture.componentInstance.model.camera).toBe(0);
  });
});
