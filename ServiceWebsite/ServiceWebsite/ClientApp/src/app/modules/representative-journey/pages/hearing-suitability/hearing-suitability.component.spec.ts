import { SuitabilityChoiceComponentFixture } from '../../../base-journey/components/suitability-choice-component-fixture.spec';
import {
  RepresentativeJourneyComponentTestBed,
  RepresentativeJourneyStubs
} from '../representative-base-component/representative-journey-component-test-bed.spec';
import { RepresentativeJourney } from '../../representative-journey';
import { ChoiceTextboxComponent } from 'src/app/modules/base-journey/components/choice-textbox.component';
import { HearingSuitabilityComponent } from './hearing-suitability.component';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';

describe('HearingSuitabilityComponent', () => {
  let fixture: SuitabilityChoiceComponentFixture;
  let component: HearingSuitabilityComponent;
  let journey: jasmine.SpyObj<RepresentativeJourney>;

  beforeEach(() => {
    journey = RepresentativeJourneyStubs.journeySpy;
    const componentFixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: HearingSuitabilityComponent,
      declarations: [
        ChoiceTextboxComponent
      ],
      journey: journey
    });
    component = componentFixture.componentInstance;
    fixture = new SuitabilityChoiceComponentFixture(componentFixture);
    fixture.detectChanges();
  });

  it('binds values and goes to next step after selecting choice and choosing continue', () => {
    fixture.radioBoxIsClicked('#choice-no');
    fixture.submitIsClicked();
    expect(journey.model.hearingSuitability.answer).toBe(false);
    expect(journey.goto).toHaveBeenCalledWith(RepresentativeJourneySteps.AccessToComputer);
  });
});
