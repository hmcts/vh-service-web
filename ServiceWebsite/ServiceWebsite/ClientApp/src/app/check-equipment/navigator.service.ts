import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LocaleResources } from '../shared/resources/locale-resources';
import { CONFIG } from '../shared/config';


@Injectable()
export class NavigatorService {
  browser = <any>navigator;
  mediaDevices$: Observable<any>;
  private mediaDevicesSubject = new Subject<any>();
  localeResources: any;

  constructor() {
    this.localeResources = LocaleResources[CONFIG.Locale];
    this.mediaDevices$ = this.mediaDevicesSubject.asObservable();
    this.browser.getUserMedia = (this.browser.getUserMedia ||
      this.browser.webkitGetUserMedia ||
      this.browser.mozGetUserMedia ||
      this.browser.msGetUserMedia);
  }

  navigatorDeviceInfo() {
    let typeOfDevice = '';
    if (this.browser.userAgent.match(/iPad|Android|Touch/i) ) {
      typeOfDevice = this.localeResources.Devices.Tablet;
    } else if (this.browser.userAgent.match(/mobile/i) ) {
      typeOfDevice = this.localeResources.Devices.Mobile;
    } else {
      typeOfDevice = this.localeResources.Devices.Computer;
    }
    return typeOfDevice;
  }

  agentInfo() {
    let typeBrowser: string;
    const browserType = this.browser.userAgent;
    if (browserType.indexOf('Edge') !== -1) {
      typeBrowser = 'Edge';
    } else if (browserType.indexOf('Firefox') !== -1) {
      typeBrowser = 'Firefox';
    } else if (browserType.indexOf('Chrome') !== -1) {
      typeBrowser = 'Chrome';
    } else if (browserType.indexOf('Safari') !== -1) {
      typeBrowser = 'Safari';
    } else if (this.isIE11(browserType)) {
      typeBrowser = 'IE';
    }

    return typeBrowser;
  }

  mediaDeviceInfo() {
    const self = this;
    this.browser.mediaDevices.enumerateDevices().then(devices =>
      self.mediaDevicesSubject.next(devices));
  }

  private isIE11(browserType: string): boolean {
    return (browserType.indexOf('MSIE') !== -1 || browserType.indexOf('Trident/7.0') !== -1);
  }
}
