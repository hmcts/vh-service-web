import { JourneyStep } from './../../../base-journey/journey-step';
import { IndividualJourneySteps } from './../../individual-journey-steps';
import { UserCameraViewComponent } from './../../components/user-camera-view/user-camera-view.component';
import { ParticipantViewComponent } from './participant-view.component';
import { IndividualJourney } from '../../individual-journey';
import { VideoUrlService } from '../../services/video-url.service';
import { async } from '@angular/core/testing';
import { DeviceType } from '../../../base-journey/services/device-type';
import { VideoViewComponentTestBed } from '../../components/video-view-base/video-view-component-test-bed.spec';
import { IndividualJourneyStubs } from '../individual-base-component/individual-component-test-bed.spec';
import { MediaService } from 'src/app/services/media.service';
import { Logger } from 'src/app/services/logger';

describe('ParticipantViewComponent', () => {
  const userMediaService = jasmine.createSpyObj<MediaService>(['getStream', 'stopStream']);
  const videoUrlService = jasmine.createSpyObj<VideoUrlService>(['getVideoFileUrl']);
  const deviceType = jasmine.createSpyObj<DeviceType>(['isMobile']);
  const logger = jasmine.createSpyObj<Logger>(['error']);

  it('can be created', async(() => {
    const fixture = VideoViewComponentTestBed.createComponent(ParticipantViewComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  }));

  describe('functionality', () => {
    let component: ParticipantViewComponent;
    let journey: IndividualJourney;
    const mediaStream = new MediaStream();

    beforeEach(() => {
      journey = IndividualJourneyStubs.default;
      deviceType.isMobile.and.returnValue(false);
      component = new ParticipantViewComponent(journey, userMediaService, videoUrlService, deviceType, logger);
      component.userCameraViewComponent = jasmine.createSpyObj<UserCameraViewComponent>(['setSource']);
    });

    it(`should continue to ${IndividualJourneySteps.HelpTheCourtDecide} when pressing continue`, () => {
      let redirectedTo: JourneyStep;
      journey.redirect.subscribe((step: JourneyStep) => redirectedTo = step);
      component.continue();
      expect(redirectedTo).toBe(IndividualJourneySteps.HelpTheCourtDecide);
    });

    it('should set the video source to a media stream when initialized', async () => {
      userMediaService.getStream.and.returnValue(Promise.resolve(mediaStream));
      await component.ngAfterContentInit();
      expect(userMediaService.getStream).toHaveBeenCalled();
    });

    it('should stop use camera on destroy', async () => {
      userMediaService.getStream.and.returnValue(Promise.resolve(mediaStream));
      await component.ngAfterContentInit();

      component.ngOnDestroy();
      expect(userMediaService.stopStream).toHaveBeenCalled();
    });
    it('should detect that device is not a mobile phone', () => {
      expect(component.isMobile).toBeFalsy();
    });
    it('should detect that device is a mobile phone and not use media', async () => {
      deviceType.isMobile.and.returnValue(true);
      component = new ParticipantViewComponent(journey, userMediaService, videoUrlService, deviceType, logger);
      component.userCameraViewComponent = jasmine.createSpyObj<UserCameraViewComponent>(['setSource']);

      await component.ngAfterContentInit();
      expect(component.isMobile).toBeTruthy();
      expect(component.stream).toBeFalsy();
    });
  });
});
