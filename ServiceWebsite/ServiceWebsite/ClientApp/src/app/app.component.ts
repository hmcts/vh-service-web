import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdalService } from 'adal-angular4';
import { Config } from './models/config';
import { HeaderComponent } from './modules/shared/header/header.component';
import { WindowRef } from './modules/shared/window-ref';
import { PageTrackerService } from './services/page-tracker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // Pad the router space until it has been loaded
  padUnactivatedRouter = true;
  loggedIn: boolean;

  @ViewChild(HeaderComponent)
  header: HeaderComponent;

  constructor(
    private router: Router,
    private adalService: AdalService,
    private config: Config,
    private window: WindowRef,
    pageTracker: PageTrackerService
  ) {
    this.loggedIn = false;
    this.initAuthentication();
    pageTracker.trackNavigation(router);
  }

  private initAuthentication() {
    const config = {
      tenant: this.config.tenantId,
      clientId: this.config.clientId,
      postLogoutRedirectUri: this.config.postLogoutRedirectUri,
      redirectUri: this.config.redirectUri
    };

    this.adalService.init(config);
  }

  ngOnInit() {
    // the window callback modifies the url so store this accordingly first
    const currentUrl = this.window.getLocation().href;
    this.adalService.handleWindowCallback();
    this.loggedIn = this.adalService.userInfo.authenticated;

    if (!this.loggedIn) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: currentUrl } });
    }
  }
}
