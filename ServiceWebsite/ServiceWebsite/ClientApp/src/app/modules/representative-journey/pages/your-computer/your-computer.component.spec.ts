import { YourComputerComponent } from './your-computer.component';
import {
  RepresentativeJourneyComponentTestBed,
  RepresentativeJourneyStubs
} from '../representative-base-component/representative-journey-component-test-bed.spec';
import { CommonTests } from 'src/app/modules/base-journey/components/common-tests.spec';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';
import { fakeAsync, tick } from '@angular/core/testing';

describe('YourComputerComponent for representative', () => {
  it(`'should only proceed to next step, ${RepresentativeJourneySteps.AboutYourComputer}, after having selected an option'`, () => {
    const journey = RepresentativeJourneyStubs.journeySpy;
    const fixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: YourComputerComponent,
      journey: journey
    });

    CommonTests.cannotProceedUntilChoiceIsSelected(fixture);

    // and value is bound
    expect(fixture.componentInstance.model.computer).toBe(true);
    expect(journey.goto).toHaveBeenCalledWith(RepresentativeJourneySteps.AboutYourComputer);
  });

  it(`should submit questionnaire and go to ${RepresentativeJourneySteps.AnswersSaved} if not having access to computer`,
    fakeAsync(() => {
    const journey = RepresentativeJourneyStubs.journeySpy;
    const component = new YourComputerComponent(journey);

    component.ngOnInit();
    component.choice.setValue(false);

    component.submit();
    tick();

    expect(journey.submitQuestionnaire).toHaveBeenCalled();
    expect(journey.goto).toHaveBeenCalledWith(RepresentativeJourneySteps.AnswersSaved);
  }));
});
