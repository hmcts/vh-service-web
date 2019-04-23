import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SecurityRoutingModule } from './security-routing.module';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { UnauthorisedComponent } from './unauthorized/unauthorised.component';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    UnauthorisedComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    SecurityRoutingModule
  ],
})
export class SecurityModule {
}
