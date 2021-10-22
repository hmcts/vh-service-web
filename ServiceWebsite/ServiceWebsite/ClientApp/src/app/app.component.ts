import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
    AuthorizationResult,
    EventTypes,
    OidcClientNotification,
    OidcSecurityService,
    PublicEventsService
} from 'angular-auth-oidc-client';
import { NEVER, Subscription } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
import { DeviceType } from './modules/base-journey/services/device-type';
import { PageUrls } from './modules/shared/constants/page-url.constants';
import { HeaderComponent } from './modules/shared/header/header.component';
import { Paths } from './paths';
import { ConfigService } from './services/config.service';
import { Logger } from './services/logger';
import { PageTrackerService } from './services/page-tracker.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    loggedIn: boolean;
    initialized: boolean;

    @ViewChild(HeaderComponent, { static: true })
    header: HeaderComponent;

    @ViewChild('mainContent', { static: true })
    main: ElementRef<HTMLElement>;

    eventServiceSubscription$: Subscription;

    constructor(
        private configService: ConfigService,
        private router: Router,
        private oidcSecurityService: OidcSecurityService,
        private pageTracker: PageTrackerService,
        private deviceTypeService: DeviceType,
        private eventService: PublicEventsService,
        private logger: Logger
    ) {
        this.loggedIn = false;
        this.pageTracker.trackNavigation(this.router);
    }

    ngOnInit(): void {
        this.checkBrowser();
        this.configService.getClientSettings().subscribe({
            next: async () => {
                this.postConfigSetup();
            }
        });
    }

    ngOnDestroy(): void {
        this.eventServiceSubscription$.unsubscribe();
    }

    private postConfigSetup() {
        this.checkAuth().subscribe({
            next: async (loggedIn: boolean) => {
                await this.postAuthSetup(loggedIn);
            }
        });

        this.eventServiceSubscription$ = this.eventService
            .registerForEvents()
            .pipe(filter(notification => notification.type === EventTypes.NewAuthorizationResult))
            .subscribe(async (value: OidcClientNotification<AuthorizationResult>) => {
                this.logger.info('[AppComponent] - OidcClientNotification event received with value ', value);
                await this.postAuthSetup(true);
            });
    }

    private async postAuthSetup(loggedIn: boolean) {
        this.loggedIn = loggedIn;
    }

    checkAuth() {
        return this.oidcSecurityService.checkAuth().pipe(
            catchError(err => {
                this.logger.error('[AppComponent] - Check Auth Error', err);
                this.router.navigate([PageUrls.Login]);
                return NEVER;
            })
        );
    }

    checkBrowser(): void {
        if (!this.deviceTypeService.isSupportedBrowser()) {
            this.logger.warn('[AppComponent] - Browser not supported, going to unsupported page');
            this.router.navigateByUrl(Paths.UnsupportedBrowser);
        }
        this.logger.info('[AppComponent] - Browser supported');
    }

    skipToContent() {
        this.main.nativeElement.focus();
    }
}
