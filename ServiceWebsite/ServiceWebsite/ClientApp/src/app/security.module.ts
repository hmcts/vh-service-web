import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { UnauthorisedComponent } from './error/unauthorised.component';

import { SharedModule } from './shared/shared.module';
import { SecurityRoutingModule } from './security-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    UnauthorisedComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SecurityRoutingModule,
  ],
})
export class SecurityModule {
}
