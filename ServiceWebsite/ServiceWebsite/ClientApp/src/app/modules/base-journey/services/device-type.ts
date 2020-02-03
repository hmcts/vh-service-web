import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DetectIPadService } from './detect-i-pad.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceType {

  constructor(private deviceDetectorService: DeviceDetectorService, private detectiPadService: DetectIPadService) {
  }

  isMobile() {
    return this.deviceDetectorService.isMobile();
  }

  isTablet() {
    return this.deviceDetectorService.isTablet() || this.detectiPadService.detectiPad();
  }

  isDesktop() {
    return this.deviceDetectorService.isDesktop();
  }

  isSupportedBrowser(): boolean {
      const supportedBrowsers = ['Firefox', 'Safari', 'Chrome', 'Edge', 'MS-Edge'];
    const browser = this.deviceDetectorService.browser;
console.log('isSupportedBrowser()' + browser);
    return supportedBrowsers.findIndex(x => x.toUpperCase() === browser.toUpperCase()) > -1;
  }

  getBrowserName(): string {
    return this.deviceDetectorService.browser;
  }
}
