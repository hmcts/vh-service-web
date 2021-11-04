import { Injectable } from '@angular/core';
import { DeviceDetectorService, OS } from 'ngx-device-detector';
import { browsers } from 'src/app/browser.constants';
import { Logger } from 'src/app/services/logger';

@Injectable({
    providedIn: 'root'
})
export class DeviceType {
    loggerPrefix = '[DeviceType] -';
    constructor(private deviceDetectorService: DeviceDetectorService, private logger: Logger) {}

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
            this.deviceDetectorService.os.toLowerCase() === OS.IOS.toLowerCase() ||
            (this.deviceDetectorService.os.toLowerCase() === OS.MAC.toLowerCase() && !this.isDesktop())
        );
    }

    isSupportedBrowser(): boolean {
        this.logger.debug(`${this.loggerPrefix} checking if is supported browser`);
        const supportedBrowsers = [
            browsers.Firefox,
            browsers.Safari,
            browsers.Chrome,
            browsers.MSEdge,
            browsers.MSEdgeChromium,
            browsers.Samsung
        ];
        const browser = this.deviceDetectorService.browser;
        this.logger.info(`${this.loggerPrefix} browser: ${browser}, os: ${this.deviceDetectorService.os}`);
        const supportedIOSBrowsers = [browsers.Safari];

        if (this.isIOS()) {
            this.logger.info(`${this.loggerPrefix} is iOS device`);
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
