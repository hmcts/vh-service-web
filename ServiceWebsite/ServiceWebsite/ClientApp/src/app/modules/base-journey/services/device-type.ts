import { Injectable } from '@angular/core';
import { DeviceDetectorService, OS } from 'ngx-device-detector';
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
            this.isIOS() &&
            this.deviceDetectorService.browser.toLowerCase() === 'safari'
        );
    }

    isIOS(): boolean {
        return (
            this.deviceDetectorService.os.toLowerCase() === OS.MAC.toLowerCase() ||
            this.deviceDetectorService.os.toLowerCase() === OS.IOS.toLowerCase()
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
        const supportedIOSBrowsers = [browsers.Safari];

        if (this.isIOS() && !this.isDesktop()) {
            return supportedIOSBrowsers.findIndex(x => x.toUpperCase() === browser.toUpperCase()) > -1;
        }
        return supportedBrowsers.findIndex(x => x.toUpperCase() === browser.toUpperCase()) > -1;
    }

    getBrowserName(): string {
        return this.deviceDetectorService.browser;
    }

    getBrowserVersion(): string {
        return this.deviceDetectorService.browser_version;
    }
}
