import { RepresentativeJourneySteps } from './../../representative-journey-steps';
import { CommonTests } from 'src/app/modules/base-journey/components/common-tests.spec';
import { AboutYourComputerComponent } from './about-your-computer.component';
import {
  RepresentativeJourneyStubs,
  RepresentativeJourneyComponentTestBed
} from '../representative-base-component/representative-journey-component-test-bed.spec';

describe('AboutYourComputerComponent', () => {
  it(`should go to ${RepresentativeJourneySteps.AnswersSaved} and have submitted after having selected an option`, async () => {
    const journey = RepresentativeJourneyStubs.journeySpy;
    const fixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: AboutYourComputerComponent,
      journey: journey
    });

    CommonTests.cannotProceedUntilChoiceIsSelected(fixture);

    // need to await async submit
    await fixture.whenStable();

    // and value is bound
    expect(fixture.componentInstance.model.camera).toBe(0);
    expect(journey.submitQuestionnaire).toHaveBeenCalled();
    expect(journey.goto).toHaveBeenCalledWith(RepresentativeJourneySteps.AnswersSaved);
  });

  it('should initialize choice value', () => {
    const component = new AboutYourComputerComponent(RepresentativeJourneyStubs.default);
    component.model.camera = 1;
    component.ngOnInit();
    expect(component.model.camera).toBe(1);
  });
});
