import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ProfileService } from 'src/app/services/profile.service';
import { DeviceType } from './modules/base-journey/services/device-type';
import { JourneySelector } from './modules/base-journey/services/journey.selector';
import { NavigationBackSelector } from './modules/base-journey/services/navigation-back.selector';
import { HeaderComponent } from './modules/shared/header/header.component';
import { Config } from './modules/shared/models/config';
import { WindowRef } from './modules/shared/window-ref';
import { Paths } from './paths';
import { ConfigService } from './services/config.service';
import { DocumentRedirectService } from './services/document-redirect.service';
import { Logger } from './services/logger';
import { PageTrackerService } from './services/page-tracker.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    loggedIn: boolean;
    initialized: boolean;

    @ViewChild(HeaderComponent, { static: true })
    header: HeaderComponent;

    @ViewChild('mainContent', { static: true })
    main: ElementRef<HTMLElement>;

    constructor(
        private router: Router,
        private oidcSecurityService: OidcSecurityService,
        private window: WindowRef,
        private profileService: ProfileService,
        private journeySelector: JourneySelector,
        pageTracker: PageTrackerService,
        private deviceTypeService: DeviceType,
        private navigationBackSelector: NavigationBackSelector,
        private redirect: DocumentRedirectService,
        private logger: Logger,
        private configService: ConfigService
    ) {
        this.loggedIn = false;
        pageTracker.trackNavigation(router);
    }

    ngOnInit() {
        this.checkBrowser();
        this.configService.getClientSettings().subscribe(clientSettings => {
            this.oidcSecurityService.checkAuth().subscribe(loggedIn => {
                this.loggedIn = loggedIn;
                this.initialiseProfile(clientSettings).then(() => (this.initialized = true));
            });
        });
    }

    private async initialiseProfile(clientSettings: Config): Promise<void> {
        // the window callback modifies the url so store this accordingly first
        const currentUrl = this.window.getLocation().href;
        if (!this.loggedIn) {
            this.logger.event('telemetry:serviceweb:any:login:notauthenticated');
            this.logger.flushBuffer();
            this.logger.debug('[AppComponent] - User not logged in, going to login page');
            await this.router.navigate(['/login'], { queryParams: { returnUrl: currentUrl } });
            return;
        }

        this.logger.event('telemetry:serviceweb:any:login:authenticated');

        try {
            this.logger.debug('[AppComponent] - Attempting to get the user profile');
            const profile = await this.profileService.getUserProfile();
            if (profile === undefined || profile.email === undefined || profile.role === undefined || profile.role === 'None') {
                this.logger.warn(`[AppComponent] - No profile information found for user. Going to unauthorised`);
                await this.router.navigate(['/unauthorized']);
                return;
            }

            this.logger.info(`Found profile for user. Beginning journing for ${profile.role}`);
            await this.journeySelector.beginFor(profile.role);
            await this.navigationBackSelector.beginFor(profile.role);
        } catch (err) {
            const errorMessage = `Error ${err.status ? err.status : ''}:
        ${err.message ? err.message : 'No Error Message'}:
        ${err.response ? err.response : 'No Response'}
        `;

            this.logger.error(`[AppComponent] - Failed to get the user profile. ${errorMessage}`, err);

            if (err.status) {
                if (err.status === 401) {
                    this.logger.event('telemetry:serviceweb:any:login:unauthorized');
                    await this.router.navigate(['/unauthorized']);
                    return;
                }
            }
            this.logger.info('[AppComponent] - Redirecting to video web');
            this.redirect.to(clientSettings.video_app_url);

            return;
        }
    }

    checkBrowser(): void {
        if (!this.deviceTypeService.isSupportedBrowser()) {
            this.logger.warn('[AppComponent] - Browser not supported, going to unsupported page');
            this.router.navigateByUrl(Paths.UnsupportedBrowser);
        }
    }

    skipToContent() {
        this.main.nativeElement.focus();
    }
}
