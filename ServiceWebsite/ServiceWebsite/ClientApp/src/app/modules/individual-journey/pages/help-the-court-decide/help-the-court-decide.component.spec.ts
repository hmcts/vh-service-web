import { CommonIndividualComponentTests } from './../individual-base-component/individual-component-test-bed.spec';
import { HelpTheCourtDecideComponent } from './help-the-court-decide.component';
import { IndividualJourneySteps } from '../../individual-journey-steps';

describe('HelpTheCourtDecideComponent', () => {
  it(`goes to ${IndividualJourneySteps.AboutYou} when continue is pressed`, () => {
    CommonIndividualComponentTests.goesToStepWhenButtonIsPressed(
      IndividualJourneySteps.AboutYou,
      { component: HelpTheCourtDecideComponent }
      );
  });
});
