import { ChoiceTextboxComponent } from './../../../base-journey/components/choice-textbox.component';
import { IndividualJourneyComponentTestBed, IndividualJourneyStubs } from '../individual-base-component/individual-component-test-bed.spec';
import { SuitabilityChoiceComponentFixture } from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';
import { AboutYouComponent } from './about-you.component';
import { IndividualJourney } from '../../individual-journey';

describe('AboutYouComponent', () => {
  let fixture: SuitabilityChoiceComponentFixture;
  let component: AboutYouComponent;
  let journey: jasmine.SpyObj<IndividualJourney>;

  beforeEach(() => {
    journey = IndividualJourneyStubs.journeySpy;
    const componentFixture = IndividualJourneyComponentTestBed.createComponent({
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
