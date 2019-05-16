import { CourtBuildingVideoComponent } from './court-building-video.component';
import { Component, Input } from '@angular/core';
import { VideoUrlService } from '../../services/video-url.service';
import { IndividualJourney } from '../../individual-journey';
import { CanCreateVideoViewBaseComponent } from '../../components/video-view-base/video-view-base.component.spec';

describe('CourtBuildingVideoComponent', () => {
  it('can be created', (() => {
    CanCreateVideoViewBaseComponent(CourtBuildingVideoComponent);
  }));

  describe('functionality', () => {
    let component: CourtBuildingVideoComponent;
    const videoUrlService = jasmine.createSpyObj<VideoUrlService>(['getVideoFileUrl']);

    beforeEach(() => {
      const journey = new IndividualJourney();
      component = new CourtBuildingVideoComponent(journey, videoUrlService);
    });

    it('should set the video source when initialized', () => {
      videoUrlService.getVideoFileUrl.and.returnValue('/hearingVideo');
      component.ngOnInit();
      expect(videoUrlService.getVideoFileUrl).toHaveBeenCalled();
      expect(component.videoSource).toBeTruthy();
    });
  });
});
