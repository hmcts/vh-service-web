import { IndividualJourneyComponentTestBed } from '../individual-base-component/individual-component-test-bed.spec';
import { ExploreCourtBuildingComponent } from './explore-court-building.component';

describe('ExploreCourtBuildingComponent', () => {
  it('can be created', () => {
    const fixture = IndividualJourneyComponentTestBed.createComponent({ component: ExploreCourtBuildingComponent });
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
