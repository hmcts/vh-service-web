import { CourtBuildingVideoComponent } from './court-building-video.component';
import { CommonIndividualComponentTests } from '../individual-base-component/individual-component-test-bed.spec';

describe('CourtBuildingVideoComponent', () => {
  it('continues when pressing button', (() => {
    CommonIndividualComponentTests.continuesWhenButtonIsPressed({
      component: CourtBuildingVideoComponent
    });
  }));
});
