import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { UnauthorisedComponent } from './unauthorized/unauthorised.component';
import { Paths } from './paths';
import { ReturnUrlService } from './return-url.service';

const securityRoutes: Routes = [
  { path: Paths.Login, component: LoginComponent },
  { path: Paths.Logout, component: LogoutComponent },
  { path: Paths.Unauthorized, component: UnauthorisedComponent },
];

@NgModule({
  exports: [
    RouterModule
  ],
  providers: [
    ReturnUrlService
  ],
  imports: [
    RouterModule.forChild(securityRoutes)
  ],
})
export class SecurityRoutingModule {
}
