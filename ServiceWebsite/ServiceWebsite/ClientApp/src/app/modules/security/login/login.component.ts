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
    private configService: ConfigService,
  ) { }

  ngOnInit() {
    this.configService.getClientSettings().subscribe(() => {
      this.oidcSecurityService.isAuthenticated$.pipe(
        catchError(err => {
          this.logger.error(`${this.loggerPrefix} Check Auth Error`, err);
          this.router.navigate(['/']);
          return NEVER;
        })
      )
        .subscribe(loggedIn => {
          const returnUrl = this.returnUrlService.popUrl() || '/';
          if (loggedIn) {
            try {
              this.router.navigateByUrl(returnUrl);
            } catch (e) {
              this.logger.error('Failed to navigate to redirect url, possibly stored url is invalid', e, returnUrl);
              this.router.navigate(['/']);
            }
          } else {
            try {
              this.returnUrlService.setUrl(returnUrl);
              this.assertEdgeRedirectIssue(returnUrl);
              this.oidcSecurityService.authorize();
            } catch (err) {
              this.logger.error(`${this.loggerPrefix} Authorize Failed`, err);
            }
          }
        });
    });
  }

  private assertEdgeRedirectIssue(redirectUrl: string): void {
    // Required for redirect issue on Edge, it doesn't solve the issue but it will let us know when it happens
    // see https://github.com/AzureAD/azure-activedirectory-library-for-js/wiki/Known-issues-on-Edge
    // in summary, when the user tries to log in and has either the login portal or the site itself in a different zone
    // the session storage will be cleared, meaning the handleWindowCallback is not handling the callback properly
    // in this method we check if we're trying to login when the id token actually exists in the return url
    // if this happens it means we've already been redirected back from microsoft login portal, and are looping the login
    if (redirectUrl.indexOf('#id_token') > -1) {
      throw new Error('Edge login redirection loop has occured. Please ensure login portal and website are in the same internet zones.');
    }
  }
}
