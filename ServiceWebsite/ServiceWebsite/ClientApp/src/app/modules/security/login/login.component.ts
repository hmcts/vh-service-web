import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdalService } from 'adal-angular4';
import { ReturnUrlService } from '../return-url.service';
import { Logger } from 'src/app/services/logger';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private logger: Logger,
    private returnUrlService: ReturnUrlService,
    private adalSvc: AdalService) { }

  async ngOnInit() {
    if (this.adalSvc.userInfo.authenticated) {
      const returnUrl = this.returnUrlService.popUrl() || '/';
      try {
        await this.router.navigateByUrl(returnUrl);
      } catch (e) {
        this.logger.error('Failed to navigate to redirect url, possibly stored url is invalid', e, returnUrl);
        await this.router.navigate(['/']);
      }
    } else {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.returnUrlService.setUrl(returnUrl);
      this.assertEdgeRedirectIssue(returnUrl);
      this.adalSvc.login();
    }
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
