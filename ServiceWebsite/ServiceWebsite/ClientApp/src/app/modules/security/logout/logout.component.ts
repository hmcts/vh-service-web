import {Component, OnInit} from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import {Paths} from '../paths';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {
  readonly loginPath = '../' + Paths.Login;
  loggedIn : boolean;
  constructor(private oidcSecurityService: OidcSecurityService) {
  }

  ngOnInit() {
    sessionStorage.clear();
    
    this.oidcSecurityService.isAuthenticated$.subscribe(logIn => {
      this.loggedIn = logIn; 
      if (logIn) {
          this.oidcSecurityService.logoffAndRevokeTokens();
      }
    });
  }
}
