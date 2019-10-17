import { IndividualJourneySteps } from './../../individual-journey-steps';
import { CommonIndividualComponentTests } from '../individual-base-component/individual-component-test-bed.spec';
import { ExploreCourtBuildingComponent } from './explore-court-building.component';
import { BackNavigationStubComponent } from '../../../../testing/stubs/back-navigation-stub';
import { DeviceType } from 'src/app/modules/base-journey/services/device-type';

describe('ExploreCourtBuildingComponent', () => {
  let deviceType: jasmine.SpyObj<DeviceType>;
  deviceType = jasmine.createSpyObj<DeviceType>(['isMobile', 'isTablet']);

  it(`goes to ${IndividualJourneySteps.CourtInformationVideo} when pressing continue`, () => {
    CommonIndividualComponentTests.goesToStepWhenButtonIsPressed(
      IndividualJourneySteps.CourtInformationVideo,
      {
        component: ExploreCourtBuildingComponent,
        declarations: [BackNavigationStubComponent],
        providers: [{ provide: DeviceType, useValue: deviceType }]
      }
    );
  });
});
