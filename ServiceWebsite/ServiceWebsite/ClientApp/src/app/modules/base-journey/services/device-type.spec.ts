import { DeviceType } from './device-type';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DetectIPadService } from './detect-i-pad.service';
import { browsers } from 'src/app/browser.constants';

describe('DeviceType', () => {
    let service: DeviceType;
    let deviceDetectorService: jasmine.SpyObj<DeviceDetectorService>;
    let deviceIpadService: jasmine.SpyObj<DetectIPadService>;

    beforeAll(() => {
        deviceDetectorService = jasmine.createSpyObj<DeviceDetectorService>('DeviceDetectorService', ['isMobile', 'isTablet', 'isDesktop']);
        deviceIpadService = jasmine.createSpyObj<DetectIPadService>('DetectIPadService', ['detectiPad']);
    });

    beforeEach(() => {
        service = new DeviceType(deviceDetectorService, deviceIpadService);
    });

    const isMobileTestCases = [
        { isMobile: true, expected: true },
        { isMobile: false, expected: false }
    ];

    isMobileTestCases.forEach(test => {
        it(`should return is mobile: ${test.expected} when mobile device is ${test.isMobile}`, () => {
            deviceDetectorService.isMobile.and.returnValue(test.isMobile);
            expect(service.isMobile()).toBe(test.expected);
        });
    });

    const isTabletTestCases = [
        { isTablet: true, expected: true },
        { isTablet: false, expected: false }
    ];

    isTabletTestCases.forEach(test => {
        it(`should return is tablet: ${test.expected} when tablet device is ${test.isTablet}`, () => {
            deviceDetectorService.isTablet.and.returnValue(test.isTablet);
            expect(service.isTablet()).toBe(test.expected);
        });
    });

    const isDesktopTestCases = [
        { isDesktop: true, expected: true },
        { isDesktop: false, expected: false }
    ];

    isDesktopTestCases.forEach(test => {
        it(`should return is desktop: ${test.expected} when desktop device is ${test.isDesktop}`, () => {
            deviceDetectorService.isDesktop.and.returnValue(test.isDesktop);
            expect(service.isDesktop()).toBe(test.expected);
        });
    });

    const isIpadTestCases = [
        { isTablet: true, os: 'Mac', browser: 'Safari', expected: true },
        { isTablet: true, os: 'Mac', browser: 'Chrome', expected: false },
        { isTablet: true, os: 'Mac', browser: 'Firefox', expected: false },
        { isTablet: false, os: 'Mac', browser: 'Chrome', expected: false },
        { isTablet: false, os: 'Mac', browser: 'Firefox', expected: false },
        { isTablet: false, os: 'Windows', browser: 'Firefox', expected: false },
        { isTablet: false, os: 'Windows', browser: 'Chrome', expected: false },
        { isTablet: false, os: 'Windows', browser: 'MS-Edge-Chromium', expected: false }
    ];

    isIpadTestCases.forEach(test => {
        it(`should return is iPad: ${test.expected} 
        when tablet is ${test.isTablet}, 
        os is ${test.os} 
        and browser is ${test.browser}`, () => {
            deviceDetectorService.isTablet.and.returnValue(test.isTablet);
            deviceDetectorService.os = test.os;
            deviceDetectorService.browser = test.browser;

            expect(service.isIpad()).toBe(test.expected);
        });
    });

    it('should return the browser name', () => {
        const testBrowser = 'Firefox';
        deviceDetectorService.browser = testBrowser;
        expect(service.getBrowserName()).toBe(testBrowser);
    });

    it('should return the browser version', () => {
        const testBrowserVersion = '1.2.3.4';
        deviceDetectorService.browser_version = testBrowserVersion;
        expect(service.getBrowserVersion()).toBe(testBrowserVersion);
    });

    const isSupportedBrowserTestCases = [
        { browser: browsers.Firefox, expected: true },
        { browser: browsers.Safari, expected: true },
        { browser: browsers.Chrome, expected: true },
        { browser: browsers.MSEdge, expected: true },
        { browser: browsers.Samsung, expected: true },
        { browser: browsers.MSEdgeChromium, expected: true },
        { browser: browsers.Opera, expected: false },
        { browser: browsers.Brave, expected: false },
        { browser: browsers.MSInternetExplorer, expected: false }
    ];

    isSupportedBrowserTestCases.forEach(test => {
        it(`should return ${test.expected} when browser is ${test.browser}`, () => {
            deviceDetectorService.browser = test.browser;
            expect(service.isSupportedBrowser()).toBe(test.expected);
        });
    });
});
