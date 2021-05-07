import { JourneySelector } from './modules/base-journey/services/journey.selector';
import { ProfileService } from 'src/app/services/profile.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from './modules/shared/models/config';
import { HeaderComponent } from './modules/shared/header/header.component';
import { WindowRef } from './modules/shared/window-ref';
import { PageTrackerService } from './services/page-tracker.service';
import { DeviceType } from './modules/base-journey/services/device-type';
import { Paths } from './paths';
import { NavigationBackSelector } from './modules/base-journey/services/navigation-back.selector';
import { DocumentRedirectService } from './services/document-redirect.service';
import { Logger } from './services/logger';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ConfigService } from './services/config.service';

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
            await this.router.navigate(['/login'], { queryParams: { returnUrl: currentUrl } });
            return;
        }

        this.logger.event('telemetry:serviceweb:any:login:authenticated');

        try {
            const profile = await this.profileService.getUserProfile();
            if (profile === undefined || profile.email === undefined || profile.role === undefined || profile.role === 'None') {
                await this.router.navigate(['/unauthorized']);
                return;
            }

            await this.journeySelector.beginFor(profile.role);
            await this.navigationBackSelector.beginFor(profile.role);
        } catch (err) {
            const errorMessage = `Error ${err.status ? err.status : ''}:
        ${err.message ? err.message : 'No Error Message'}:
        ${err.response ? err.response : 'No Response'}
        `;

            this.logger.error(errorMessage, err);

            if (err.status) {
                if (err.status === 401) {
                    this.logger.event('telemetry:serviceweb:any:login:unauthorized');
                    await this.router.navigate(['/unauthorized']);
                    return;
                }
            }
            this.redirect.to(clientSettings.video_app_url);

            return;
        }
    }

    checkBrowser(): void {
        if (!this.deviceTypeService.isSupportedBrowser()) {
            this.router.navigateByUrl(Paths.UnsupportedBrowser);
        }
    }

    skipToContent() {
        this.main.nativeElement.focus();
    }
}
