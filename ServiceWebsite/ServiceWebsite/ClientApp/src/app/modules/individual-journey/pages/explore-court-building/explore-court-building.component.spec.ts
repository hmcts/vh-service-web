import { IndividualJourneySteps } from './../../individual-journey-steps';
import { CommonIndividualComponentTests } from '../individual-base-component/individual-component-test-bed.spec';
import { ExploreCourtBuildingComponent } from './explore-court-building.component';
import { BackNavigationStubComponent } from '../../../../testing/stubs/back-navigation-stub';

describe('ExploreCourtBuildingComponent', () => {
  it(`goes to ${IndividualJourneySteps.CourtInformationVideo} when pressing continue`, () => {
    CommonIndividualComponentTests.goesToStepWhenButtonIsPressed(
      IndividualJourneySteps.CourtInformationVideo,
      {
        component: ExploreCourtBuildingComponent,
        declarations: [BackNavigationStubComponent]
      }
    );
  });
});
