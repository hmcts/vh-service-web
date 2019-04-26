import { VideoViewComponent } from "./video-view.component";
import { TestBed, ComponentFixture, async } from "@angular/core/testing";
import { CanCreateComponent } from "../../pages/individual-base-component/component-test-bed.spec";

describe('VideoViewComponent', () => {
  it('should emit loaded event', () => {
    let videoViewComponent = new VideoViewComponent();
    spyOn(videoViewComponent.loaded, 'emit');
    videoViewComponent.readyToPlay();
    expect(videoViewComponent.loaded.emit).toHaveBeenCalled();
  });
});
