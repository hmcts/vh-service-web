import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ReturnUrlService } from '../return-url.service';
import { Logger } from 'src/app/services/logger';
import { ConfigService } from 'src/app/services/config.service';
import { catchError } from 'rxjs/operators';
import { NEVER } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    private readonly loggerPrefix = '[Login] -';
    constructor(
        private router: Router,
        private logger: Logger,
        private returnUrlService: ReturnUrlService,
        private oidcSecurityService: OidcSecurityService,
        private configService: ConfigService
    ) {}

    ngOnInit() {
        this.configService.getClientSettings().subscribe(() => {
            this.oidcSecurityService.isAuthenticated$
                .pipe(
                    catchError(err => {
                        this.logger.error(`${this.loggerPrefix} Check Auth Error`, err);
                        this.router.navigate(['/']);
                        return NEVER;
                    })
                )
                .subscribe(loggedIn => {
                    const returnUrl = this.returnUrlService.popUrl() || '/';
                    if (loggedIn) {
                        this.router.navigateByUrl(returnUrl).catch(e => {
                            this.logger.error('Failed to navigate to redirect url, possibly stored url is invalid', e, returnUrl);
                            this.router.navigate(['/']);
                        });
                    } else {
                        try {
                            this.returnUrlService.setUrl(returnUrl);
                            this.oidcSecurityService.authorize();
                        } catch (err) {
                            this.logger.error(`${this.loggerPrefix} Authorize Failed`, err);
                        }
                    }
                });
        });
    }
}
