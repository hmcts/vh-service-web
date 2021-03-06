import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { PageTrackerService } from './page-tracker.service';
import { AppInsightsLogger } from './app-insights-logger.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, NgModule } from '@angular/core';

@Component({ selector: 'app-mock-component', template: '' })
class MockComponent {}

const routes = [
    {
        path: 'component-path',
        component: MockComponent,
        children: [{ path: 'sub-component', component: MockComponent }]
    }
];

describe('PageTrackerService', () => {
    let pageTrackerService: PageTrackerService;
    let appInsightsLogger: jasmine.SpyObj<AppInsightsLogger>;
    let router: Router;

    beforeEach(() => {
        appInsightsLogger = jasmine.createSpyObj('AppInsightsLogger', ['trackPage']);

        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes)],
            declarations: [MockComponent],
            providers: [PageTrackerService, { provide: AppInsightsLogger, useValue: appInsightsLogger }]
        });

        router = TestBed.inject(Router);
        pageTrackerService = TestBed.inject(PageTrackerService);
        pageTrackerService.trackNavigation(router);
    });

    it('should log page on routing',
        fakeAsync(() => {
            router.initialNavigation();
            router.navigate(['component-path']);
            tick();
            expect(appInsightsLogger.trackPage).toHaveBeenCalledWith('MockComponent /component-path', '/component-path');
        })
    );

    it('should log page with child on routing',
        fakeAsync(() => {
            router.initialNavigation();
            router.navigate(['component-path/sub-component']);
            tick();
            expect(appInsightsLogger.trackPage).toHaveBeenCalledWith(
                'MockComponent /component-path/sub-component',
                '/component-path/sub-component'
            );
        })
    );
});
