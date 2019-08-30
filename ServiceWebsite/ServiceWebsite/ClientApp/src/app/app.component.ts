import {JourneySelector} from './modules/base-journey/services/journey.selector';
import {ProfileService} from 'src/app/services/profile.service';
import {Component, OnInit, ViewChild, Renderer, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {AdalService} from 'adal-angular4';
import {Config} from './modules/shared/models/config';
import {HeaderComponent} from './modules/shared/header/header.component';
import {WindowRef} from './modules/shared/window-ref';
import {PageTrackerService} from './services/page-tracker.service';
import {DeviceType} from './modules/base-journey/services/device-type';
import {Paths} from './paths';
import {NavigationBackSelector} from './modules/base-journey/services/navigation-back.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedIn: boolean;
  initialized: boolean;

  @ViewChild(HeaderComponent, {static: true})
  header: HeaderComponent;

  @ViewChild('mainContent', {static: true})
  main: ElementRef;

  constructor(
    private router: Router,
    private adalService: AdalService,
    private config: Config,
    private window: WindowRef,
    private profileService: ProfileService,
    private journeySelector: JourneySelector,
    pageTracker: PageTrackerService,
    private deviceTypeService: DeviceType,
    private navigationBackSelector: NavigationBackSelector,
    private renderer: Renderer
  ) {
    this.loggedIn = false;
    this.initAuthentication();
    pageTracker.trackNavigation(router);
  }

  private initAuthentication() {
    const config: adal.Config = {
      tenant: this.config.tenantId,
      clientId: this.config.clientId,
      postLogoutRedirectUri: this.config.postLogoutRedirectUri,
      redirectUri: this.config.redirectUri
    };

    this.adalService.init(config);
  }

  ngOnInit() {
    this.checkBrowser();
    this.adalService.handleWindowCallback();
    this.loggedIn = this.adalService.userInfo.authenticated;

    this.initialiseProfile().then(() => this.initialized = true);
  }

  private async initialiseProfile(): Promise<void> {
    // the window callback modifies the url so store this accordingly first
    const currentUrl = this.window.getLocation().href;

    if (!this.loggedIn) {
      await this.router.navigate(['/login'], {queryParams: {returnUrl: currentUrl}});
    } else {
      const profile = await this.profileService.getUserProfile();

      if (profile === undefined || profile.email === undefined || profile.role === undefined) {
        await this.router.navigate(['/unauthorized']);
      } else {
        await this.journeySelector.beginFor(profile.role);
        await this.navigationBackSelector.beginFor(profile.role);
      }
    }
  }

  checkBrowser(): void {
    if (!this.deviceTypeService.isSupportedBrowser()) {
      this.router.navigateByUrl(Paths.UnsupportedBrowser);
    }
  }

  skipToContent() {
    this.renderer.invokeElementMethod(this.main.nativeElement, 'focus');
  }
}
