import {Component, OnInit} from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ConfigService } from 'src/app/services/config.service';
import {Paths} from '../paths';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {
  readonly loginPath = '../' + Paths.Login;
  loggedIn: boolean;
  constructor(private oidcSecurityService: OidcSecurityService,
    private configService: ConfigService) {
  }

  ngOnInit() {
    sessionStorage.clear();

    this.configService.getClientSettings().subscribe(clientSettings => {
      this.oidcSecurityService.isAuthenticated$.subscribe(loggedIn => {
        this.loggedIn = loggedIn;
        if (loggedIn) {
            this.oidcSecurityService.logoffAndRevokeTokens();
        }
      });
    });
  }
}
