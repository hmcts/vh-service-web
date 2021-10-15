import { Component, OnInit } from '@angular/core';
import { SupportedBrowserModel } from './SupportedBrowserModel';
import { DeviceType } from 'src/app/modules/base-journey/services/device-type';

@Component({
    selector: 'app-unsupported-browser',
    templateUrl: './unsupported-browser.component.html',
    styleUrls: ['./unsupported-browser.component.scss']
})
export class UnsupportedBrowserComponent {
    supportedBrowsers: SupportedBrowserModel[] = [
        new SupportedBrowserModel('Chrome', 'Chrome for Windows, Mac, Android phone, Android tablet'),
        new SupportedBrowserModel('Firefox', 'Firefox for Windows and Mac'),
        new SupportedBrowserModel('Safari', 'Safari for Mac, iPhone and iPad'),
        new SupportedBrowserModel('Edge Chromium', 'Edge for Windows'),
        new SupportedBrowserModel('Samsung', 'Samsung browser for Android phone and Android tablet')
    ];
    browserName: string;

    constructor(private deviceTypeService: DeviceType) {
        this.browserName = this.deviceTypeService.getBrowserName();
    }
}
