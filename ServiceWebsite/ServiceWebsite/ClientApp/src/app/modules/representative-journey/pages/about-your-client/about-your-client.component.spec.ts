import { SuitabilityChoiceComponentFixture } from '../../../base-journey/components/suitability-choice-component-fixture.spec';
import { AboutYourClientComponent } from './about-your-client.component';
import {
  RepresentativeJourneyComponentTestBed,
  RepresentativeJourneyStubs
} from '../representative-base-component/representative-journey-component-test-bed.spec';
import { RepresentativeJourney } from '../../representative-journey';
import { ChoiceTextboxComponent } from 'src/app/modules/base-journey/components/choice-textbox.component';

describe('AboutYourClientComponent', () => {
  let fixture: SuitabilityChoiceComponentFixture;
  let component: AboutYourClientComponent;
  let journey: jasmine.SpyObj<RepresentativeJourney>;

  beforeEach(() => {
    journey = RepresentativeJourneyStubs.journeySpy;
    const componentFixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: AboutYourClientComponent,
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
    expect(journey.model.aboutYourClient.answer).toBe(false);
    expect(journey.next).toHaveBeenCalled();
  });
});
