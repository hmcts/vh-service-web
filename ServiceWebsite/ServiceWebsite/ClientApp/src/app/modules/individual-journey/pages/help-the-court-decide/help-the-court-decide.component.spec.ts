import { CommonIndividualComponentTests } from './../individual-base-component/individual-component-test-bed.spec';
import { HelpTheCourtDecideComponent } from './help-the-court-decide.component';
import { IndividualJourneySteps } from '../../individual-journey-steps';
import { BackNavigationStubComponent } from '../../../../testing/stubs/back-navigation-stub';

describe('HelpTheCourtDecideComponent', () => {
  it(`goes to ${IndividualJourneySteps.AboutYou} when continue is pressed`, () => {
    CommonIndividualComponentTests.goesToStepWhenButtonIsPressed(
      IndividualJourneySteps.AboutYou,
      {
        component: HelpTheCourtDecideComponent,
        declarations: [BackNavigationStubComponent]
      }
      );
  });
});
