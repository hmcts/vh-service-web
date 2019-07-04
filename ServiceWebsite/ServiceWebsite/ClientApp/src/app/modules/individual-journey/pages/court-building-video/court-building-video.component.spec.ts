import { ContinuableComponentFixture } from './../../../base-journey/components/suitability-choice-component-fixture.spec';
import { IndividualJourney } from './../../individual-journey';
import { CourtBuildingVideoComponent } from './court-building-video.component';
import { VideoViewComponentTestBed } from '../../components/video-view-base/video-view-component-test-bed.spec';
import { IndividualJourneySteps } from '../../individual-journey-steps';

describe('CourtBuildingVideoComponent', () => {
  it(`goes to ${IndividualJourneySteps.ExploreVideoHearing} when pressing continue`, (() => {
    const journey = jasmine.createSpyObj<IndividualJourney>(['goto']);
    const fixture = VideoViewComponentTestBed.createComponent(CourtBuildingVideoComponent, journey);

    const test = new ContinuableComponentFixture(fixture);
    test.submitIsClicked();
    expect(journey.goto).toHaveBeenCalledWith(IndividualJourneySteps.ExploreVideoHearing);
  }));
});
