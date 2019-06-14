import { ContinuableComponentFixture } from './../../../base-journey/components/suitability-choice-component-fixture.spec';
import { IndividualJourney } from './../../individual-journey';
import { CourtBuildingVideoComponent } from './court-building-video.component';
import { VideoViewComponentTestBed } from '../../components/video-view-base/video-view-component-test-bed.spec';

describe('CourtBuildingVideoComponent', () => {
  it('continues when pressing button', (() => {
    const journey = jasmine.createSpyObj<IndividualJourney>(['next']);
    const fixture = VideoViewComponentTestBed.createComponent(CourtBuildingVideoComponent, journey);

    const test = new ContinuableComponentFixture(fixture);
    test.submitIsClicked();
    expect(journey.next).toHaveBeenCalled();
  }));
});
