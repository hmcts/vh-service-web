import { CrestBluePanelComponent } from 'src/app/modules/shared/crest-blue-panel/crest-blue-panel.component';
import {
  RepresentativeJourneyComponentTestBed,
  RepresentativeJourneyStubs
} from '../representative-base-component/representative-journey-component-test-bed.spec';
import { AboutVideoHearingsComponent } from './about-video-hearings.component';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';
import { SuitabilityChoiceComponentFixture } from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';

describe('AboutVideoHearingsComponent', () => {
  it(`should go to ${RepresentativeJourneySteps.AboutYouAndYourClient} on continuing`, () => {
    const journey = RepresentativeJourneyStubs.journeySpy;
    const componentFixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: AboutVideoHearingsComponent,
      declarations: [ CrestBluePanelComponent ],
      journey: journey
    });

    const fixture = new SuitabilityChoiceComponentFixture(componentFixture);
    fixture.submitIsClicked();

    expect(journey.goto).toHaveBeenCalledWith(RepresentativeJourneySteps.AboutYouAndYourClient);
  });
});
