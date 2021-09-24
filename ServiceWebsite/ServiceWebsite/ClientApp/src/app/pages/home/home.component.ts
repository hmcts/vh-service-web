import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventTypes, PublicEventsService } from 'angular-auth-oidc-client';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Paths } from 'src/app/paths';
import { Logger } from 'src/app/services/logger';

@Component({
    selector: 'app-home',
    template: '<p class="govuk-body govuk-!-padding-top-2">Please wait whilst we retrive your hearing details...</p>'
})
export class HomeComponent implements OnInit, OnDestroy {
    eventServiceSubscription$: Subscription;
    constructor(private router: Router, private eventService: PublicEventsService, private logger: Logger) {}

    ngOnInit(): void {
        this.eventServiceSubscription$ = this.eventService
            .registerForEvents()
            .pipe(
                filter(
                    notification =>
                        notification.type === EventTypes.UserDataChanged || notification.type === EventTypes.NewAuthorizationResult
                )
            )
            .subscribe(value => {
                if (!value.value?.isRenewProcess) {
                    this.logger.info('[HomeComponent] - First time logging', value);
                    this.router.navigate([`/${Paths.JourneySelector}`]);
                }
            });
    }

    ngOnDestroy(): void {
        this.eventServiceSubscription$.unsubscribe();
    }
}
