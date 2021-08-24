import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { browsers } from 'src/app/browser.constants';
import { DetectIPadService } from './detect-i-pad.service';

@Injectable({
    providedIn: 'root'
})
export class DeviceType {
    constructor(private deviceDetectorService: DeviceDetectorService, private detectiPadService: DetectIPadService) {}

    isMobile() {
        return this.deviceDetectorService.isMobile();
    }

    isTablet() {
        return this.deviceDetectorService.isTablet();
    }

    isDesktop() {
        return this.deviceDetectorService.isDesktop();
    }

    isIpad(): boolean {
        return (
            this.deviceDetectorService.isTablet() &&
            this.deviceDetectorService.os.toLowerCase() === 'mac' &&
            this.deviceDetectorService.browser.toLowerCase() === 'safari'
        );
    }

    isSupportedBrowser(): boolean {
        const supportedBrowsers = [
            browsers.Firefox,
            browsers.Safari,
            browsers.Chrome,
            browsers.MSEdge,
            browsers.MSEdgeChromium,
            browsers.Samsung
        ];
        const browser = this.deviceDetectorService.browser;
        return supportedBrowsers.findIndex(x => x.toUpperCase() === browser.toUpperCase()) > -1;
    }

    getBrowserName(): string {
        return this.deviceDetectorService.browser;
    }

    getBrowserVersion(): string {
        return this.deviceDetectorService.browser_version;
    }
}
