import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

import { SharedModule } from '../shared/shared.module';
import { SecurityRoutingModule } from './security-routing.module';
import { UnauthorisedComponent } from './unauthorized/unauthorised.component';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    UnauthorisedComponent
  ],
  imports: [
    SharedModule,
    SecurityRoutingModule
  ],
})
export class SecurityModule {
}
