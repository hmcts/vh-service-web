import { DeviceType } from 'src/app/modules/base-journey/services/device-type';
import { UnsupportedBrowserComponent } from './unsupported-browser.component';

describe('UnsupportedBrowserComponent', () => {
    let component: UnsupportedBrowserComponent;
    let deviceTypeServiceSpy: jasmine.SpyObj<DeviceType>;
    const browserName = 'Opera';

    beforeAll(() => {
        deviceTypeServiceSpy = jasmine.createSpyObj<DeviceType>(['getBrowserName']);
        deviceTypeServiceSpy.getBrowserName.and.returnValue(browserName);
    });

    beforeEach(() => {
        component = new UnsupportedBrowserComponent(deviceTypeServiceSpy);
    });

    it('should initalise with browser information', () => {
        expect(component.supportedBrowsers.length).toBeGreaterThan(0);
        expect(component.browserName).toBe(browserName);
    });
});
