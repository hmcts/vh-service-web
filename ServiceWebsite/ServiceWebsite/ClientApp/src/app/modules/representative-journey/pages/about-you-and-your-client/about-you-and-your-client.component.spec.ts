import {
  RepresentativeJourneyComponentTestBed,
  RepresentativeJourneyStubs
} from '../representative-base-component/representative-journey-component-test-bed.spec';
import { CrestBluePanelComponent } from 'src/app/modules/shared/crest-blue-panel/crest-blue-panel.component';
import { AboutYouAndYourClientComponent } from './about-you-and-your-client.component';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';
import { SuitabilityChoiceComponentFixture } from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';

describe('AboutYouAndYourClientComponent', () => {
  it(`goes to ${RepresentativeJourneySteps.AboutYou} when continuing`, () => {
    const journey = RepresentativeJourneyStubs.journeySpy;
    const componentFixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: AboutYouAndYourClientComponent,
      declarations: [ CrestBluePanelComponent ],
      journey: journey
    });

    const fixture = new SuitabilityChoiceComponentFixture(componentFixture);
    fixture.submitIsClicked();

    expect(journey.goto).toHaveBeenCalledWith(RepresentativeJourneySteps.AboutYou);
  });
});
