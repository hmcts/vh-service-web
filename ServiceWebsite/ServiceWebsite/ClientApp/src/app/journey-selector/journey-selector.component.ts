import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JourneySelector } from 'src/app/modules/base-journey/services/journey.selector';
import { NavigationBackSelector } from 'src/app/modules/base-journey/services/navigation-back.selector';
import { UserProfile } from 'src/app/modules/shared/models/user-profile.model';
import { ConfigService } from 'src/app/services/config.service';
import { DocumentRedirectService } from 'src/app/services/document-redirect.service';
import { Logger } from 'src/app/services/logger';
import { ProfileService } from 'src/app/services/profile.service';
import { PageUrls } from '../modules/shared/constants/page-url.constants';

@Component({
    selector: 'app-journey-selector',
    template: '<p class="govuk-body govuk-!-padding-top-2">Please wait whilst we retrive your hearing details...</p>'
})
export class JourneySelectorComponent implements OnInit {
    constructor(
        private configService: ConfigService,
        private router: Router,
        private profileService: ProfileService,
        private journeySelector: JourneySelector,
        private redirect: DocumentRedirectService,
        private navigationBackSelector: NavigationBackSelector,
        private logger: Logger
    ) {}

    ngOnInit(): void {
        this.retrieveProfile().catch(err => {
            this.handleError(err);
        });
    }

    private async retrieveProfile() {
        const profile = await this.profileService.getUserProfile();
        try {
            if (profile === undefined || profile.email === undefined || profile.role === undefined || profile.role === 'None') {
                this.logger.warn(`[JourneyComponent] - No profile information found for user. Going to unauthorised`);
                this.router.navigate([PageUrls.Unauthorised]);
                return;
            }

            await this.startJourneyForProfileIfPossible(profile);
        } catch (err) {
            this.handleError(err);
        }
    }

    private async startJourneyForProfileIfPossible(profile: UserProfile) {
        this.logger.info(`Found profile for user. Beginning journing for ${profile.role}`);
        await this.journeySelector.beginFor(profile.role);
        await this.navigationBackSelector.beginFor(profile.role);
    }

    handleError(err) {
        const errorMessage = `Error ${err.status ? err.status : ''}:
        ${err.message ? err.message : 'No Error Message'}:
        ${err.response ? err.response : 'No Response'}
        `;

        this.logger.error(`[JourneyComponent] - Failed to get the user profile. ${errorMessage}`, err);

        if (err.status && err.status === 401) {
            this.logger.event('telemetry:serviceweb:any:login:unauthorised');
            this.router.navigate([PageUrls.Unauthorised]);
        } else {
            this.logger.info('[JourneyComponent] - Redirecting to video web');
            this.goToVideoWeb();
        }
    }

    private goToVideoWeb() {
        this.configService.getClientSettings().subscribe(config => {
            this.redirect.to(config.video_app_url);
        });
    }
}
