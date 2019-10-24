import { TestBed, inject } from '@angular/core/testing';
import { DeviceType } from './device-type';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DetectIPadService } from './detect-i-pad.service';

describe('DeviceType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceDetectorService, DetectIPadService]
    });
  });

  it('should return false for a mobile device', inject([DeviceDetectorService, DetectIPadService],
    (deviceDetectorService: DeviceDetectorService, detectiPadService: DetectIPadService) => {
      const deviceType = new DeviceType(deviceDetectorService, detectiPadService);
    expect(deviceType.isMobile()).toBeFalsy();
  }));
  it('should return true for a desktop device', inject([DeviceDetectorService, DetectIPadService],
    (deviceDetectorService: DeviceDetectorService, detectiPadService: DetectIPadService) => {
      const deviceType = new DeviceType(deviceDetectorService, detectiPadService);
    expect(deviceType.isDesktop()).toBeTruthy();
  }));
});
