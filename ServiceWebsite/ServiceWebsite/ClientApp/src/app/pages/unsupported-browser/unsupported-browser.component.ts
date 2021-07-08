import { Component, OnInit } from '@angular/core';
import { SupportedBrowserModel } from './SupportedBrowserModel';
import { DeviceType } from 'src/app/modules/base-journey/services/device-type';

@Component({
  selector: 'app-unsupported-browser',
  templateUrl: './unsupported-browser.component.html',
  styleUrls: ['./unsupported-browser.component.scss']
})
export class UnsupportedBrowserComponent implements OnInit {


  supportedBrowsers: SupportedBrowserModel[] = [];

  browserName: string;

  constructor(private deviceTypeService: DeviceType) {
    this.browserName = this.deviceTypeService.getBrowserName();
    this.supportedBrowsers.push(new SupportedBrowserModel('Chrome', 'Chrome for Windows/Mac'));
    this.supportedBrowsers.push(new SupportedBrowserModel('Firefox', 'Firefox for Windows/Mac'));
    this.supportedBrowsers.push(new SupportedBrowserModel('Safari', 'Safari for Mac/iPad'));
    this.supportedBrowsers.push(new SupportedBrowserModel('Edge Chromium', 'Edge for Windows'));
  }

  ngOnInit() {
  }

}
