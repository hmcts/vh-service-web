import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Paths } from '../paths';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {
    readonly loginPath = '../' + Paths.Login;
    loggedIn: boolean;
    constructor(private oidcSecurityService: OidcSecurityService) {}

    ngOnInit() {
        this.oidcSecurityService.checkAuth().subscribe(loggedIn => {
            this.loggedIn = loggedIn;
            if (loggedIn) {
                this.oidcSecurityService.logoffAndRevokeTokens();
            }
        });
        sessionStorage.clear();
    }
}
