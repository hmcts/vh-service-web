import { DeviceType } from './device-type';
import { DeviceDetectorService } from 'ngx-device-detector';

describe('DeviceType', () => {

  it('should return true for a mobile device', () => {
    const deviceDetectorService = jasmine.createSpyObj<DeviceDetectorService>(['isMobile', 'isTablet', 'isDesktop']);
    const deviceType = new DeviceType(deviceDetectorService);
    deviceDetectorService.isMobile.and.returnValue(true);
    expect(deviceType.isMobile()).toBeTruthy();
  });
  it('should return true for a tablet device', () => {
    const deviceDetectorService = jasmine.createSpyObj<DeviceDetectorService>(['isMobile', 'isTablet', 'isDesktop']);
    const deviceType = new DeviceType(deviceDetectorService);
    deviceDetectorService.isTablet.and.returnValue(true);
    expect(deviceType.isTablet()).toBeTruthy();
  });
  it('should return true for a desktop device', () => {
    const deviceDetectorService = jasmine.createSpyObj<DeviceDetectorService>(['isMobile', 'isTablet', 'isDesktop']);
    const deviceType = new DeviceType(deviceDetectorService);
    deviceDetectorService.isDesktop.and.returnValue(true);
    expect(deviceType.isDesktop()).toBeTruthy();
  });
  it('should return false for a mobile device', () => {
    const deviceDetectorService = jasmine.createSpyObj<DeviceDetectorService>(['isMobile', 'isTablet', 'isDesktop']);
    const deviceType = new DeviceType(deviceDetectorService);
    deviceDetectorService.isMobile.and.returnValue(false);
    expect(deviceType.isMobile()).toBeFalsy();
  });
  it('should return false for a tablet device', () => {
    const deviceDetectorService = jasmine.createSpyObj<DeviceDetectorService>(['isMobile', 'isTablet', 'isDesktop']);
    const deviceType = new DeviceType(deviceDetectorService);
    deviceDetectorService.isTablet.and.returnValue(false);
    expect(deviceType.isTablet()).toBeFalsy();
  });
  it('should return false for a desktop device', () => {
    const deviceDetectorService = jasmine.createSpyObj<DeviceDetectorService>(['isMobile', 'isTablet', 'isDesktop']);
    const deviceType = new DeviceType(deviceDetectorService);
    deviceDetectorService.isDesktop.and.returnValue(false);
    expect(deviceType.isDesktop()).toBeFalsy();
  });
});
