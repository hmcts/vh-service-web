import { CommonIndividualComponentTests } from '../individual-base-component/individual-component-test-bed.spec';
import { ExploreCourtBuildingComponent } from './explore-court-building.component';

describe('ExploreCourtBuildingComponent', () => {
  it('continues when button is pressed', () => {
    CommonIndividualComponentTests.continuesWhenButtonIsPressed({
      component: ExploreCourtBuildingComponent
    });
  });
});
