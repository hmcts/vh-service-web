import { ChoiceTextboxComponent } from './../../../base-journey/components/choice-textbox.component';
import { AboutYouComponent } from './about-you.component';
import { SuitabilityChoiceComponentFixture } from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';
import {
  RepresentativeJourneyComponentTestBed,
  RepresentativeJourneyStubs
} from '../representative-base-component/representative-journey-component-test-bed.spec';
import { RepresentativeJourney } from '../../representative-journey';

describe('AboutYouComponent', () => {
  let fixture: SuitabilityChoiceComponentFixture;
  let component: AboutYouComponent;
  let journey: jasmine.SpyObj<RepresentativeJourney>;

  beforeEach(() => {
    journey = RepresentativeJourneyStubs.journeySpy;
    const componentFixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: AboutYouComponent,
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
    expect(journey.model.aboutYou.answer).toBe(false);
    expect(journey.next).toHaveBeenCalled();
  });
});
