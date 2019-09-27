import { AnswersSavedComponent } from './answers-saved.component';
import { AppYesNoPipe } from '../../../shared/boolean.pipe';
import {
  RepresentativeJourneyComponentTestBed,
  RepresentativeJourneyStubs
} from '../representative-base-component/representative-journey-component-test-bed.spec';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';
import { SuitabilityChoiceComponentFixture } from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';
import { SelfTestJourneySteps } from 'src/app/modules/self-test-journey/self-test-journey-steps';

describe('AnswersSavedComponent', () => {
  it(`goes to ${RepresentativeJourneySteps} when pressing continue`, () => {
    const journey = RepresentativeJourneyStubs.journeySpy;

    const componentFixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: AnswersSavedComponent,
      declarations: [AppYesNoPipe],
      journey: journey
    });

    const fixture = new SuitabilityChoiceComponentFixture(componentFixture);
    fixture.submitIsClicked();

    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.CheckYourComputer);
  });
});
