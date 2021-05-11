import { async, ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FooterComponent } from './footer.component';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FooterComponent', () => {
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;
    let location: Location;
    let router: Router;

    @Component({ selector: 'app-contact-us', template: '' })
    class ContactUsStubComponent {}

    @Component({ selector: 'app-dashboard', template: '' })
    class DashboardStubComponent {}

    @Component({ selector: 'app-unsupported-browser', template: '' })
    class UnsupportedBrowserStubComponent {}

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [FooterComponent, DashboardStubComponent, ContactUsStubComponent, UnsupportedBrowserStubComponent],
            imports: [
                RouterTestingModule.withRoutes([
                    { path: 'dashboard', component: DashboardStubComponent },
                    { path: 'contact-us', component: ContactUsStubComponent },
                    { path: 'unsupported-browser', component: UnsupportedBrowserStubComponent }
                ])
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it(
        'navigate to dashboard you should see contact us link in the footer',
        fakeAsync(() => {
            fixture.ngZone.run(() => {
                router.navigate(['dashboard']);
                tick();
                expect(location.path()).toBe('/dashboard');
                expect(component.hideContactUsLink).toBeFalsy();
            });
        })
    );
    it(
        'navigate to contact-us you should not see contact us link in the footer',
        fakeAsync(() => {
            fixture.ngZone.run(() => {
                router.navigate(['contact-us']);
                tick();
                expect(location.path()).toBe('/contact-us');
                expect(component.hideContactUsLink).toBeTruthy();
            });
        })
    );
    it(
        'navigate to any page with supported browser you should see the links in the footer',
        fakeAsync(() => {
            fixture.ngZone.run(() => {
                router.navigate(['dashboard']);
                tick();
                expect(location.path()).toBe('/dashboard');
                expect(component.hideLinksForUnsupportedBrowser).toBeFalsy();
            });
        })
    );
    it(
        'navigate to unsupported browser you should not see the links in the footer',
        fakeAsync(() => {
            fixture.ngZone.run(() => {
                router.navigate(['unsupported-browser']);
                tick();
                expect(location.path()).toBe('/unsupported-browser');
                expect(component.hideLinksForUnsupportedBrowser).toBeTruthy();
            });
        })
    );
});
