import { DeviceType } from './device-type';
import { DeviceDetectorService, OS } from 'ngx-device-detector';
import { browsers } from 'src/app/browser.constants';
import { Logger } from 'src/app/services/logger';

describe('DeviceType', () => {
    let service: DeviceType;
    let deviceDetectorService: jasmine.SpyObj<DeviceDetectorService>;
    let loggerSpy: jasmine.SpyObj<Logger>;

    beforeAll(() => {
        deviceDetectorService = jasmine.createSpyObj<DeviceDetectorService>('DeviceDetectorService', ['isMobile', 'isTablet', 'isDesktop']);
        loggerSpy = jasmine.createSpyObj<Logger>('Logger', ['debug', 'info']);
    });

    beforeEach(() => {
        service = new DeviceType(deviceDetectorService, loggerSpy);
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
        { isTablet: true, os: 'ios', browser: 'Safari', expected: true },
        { isTablet: true, os: 'ios', browser: 'Chrome', expected: false },
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
        // { browser: browsers.Firefox, expected: true },
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

    describe('IOS', () => {
        describe('isIOS', () => {
            const iosList = [OS.IOS, OS.MAC];
            const nonIosList = Object.keys(OS).filter(x => !iosList.includes(OS[x]));

            nonIosList.forEach(os => {
                it(`should return false when os is ${os}`, () => {
                    deviceDetectorService.os = os;
                    deviceDetectorService.isDesktop.and.returnValue(false);
                    expect(service.isIOS()).toBe(false);
                });
            });

            it('should return true when IOS is true', () => {
                deviceDetectorService.os = OS.IOS;
                expect(service.isIOS()).toBe(true);
            });

            it('should return true when mac is true and is not desktop', () => {
                deviceDetectorService.os = OS.MAC;
                deviceDetectorService.isDesktop.and.returnValue(false);
                expect(service.isIOS()).toBe(true);
            });

            it('should return false when mac is true and is desktop', () => {
                deviceDetectorService.os = OS.MAC;
                deviceDetectorService.isDesktop.and.returnValue(true);
                expect(service.isIOS()).toBe(false);
            });
        });


        const isSupportedIOSBrowserTestCases = [
            { browser: browsers.Firefox, expected: false },
            { browser: browsers.Safari, expected: true },
            { browser: browsers.Chrome, expected: false },
            { browser: browsers.MSEdge, expected: false },
            { browser: browsers.Samsung, expected: false },
            { browser: browsers.MSEdgeChromium, expected: false },
            { browser: browsers.Opera, expected: false },
            { browser: browsers.Brave, expected: false },
            { browser: browsers.MSInternetExplorer, expected: false }
        ];

        isSupportedIOSBrowserTestCases.forEach(test => {
            it(`should return ${test.expected} when browser is ${test.browser}`, () => {
                spyOn(service, 'isIOS').and.returnValue(true);
                deviceDetectorService.isDesktop.and.returnValue(false);
                deviceDetectorService.browser = test.browser;
                expect(service.isSupportedBrowser()).toBe(test.expected);
            });
        });

    });
});
