import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SecurityRoutingModule } from './security-routing.module';
import { UnauthorisedComponent } from './unauthorized/unauthorised.component';

@NgModule({
    declarations: [LoginComponent, LogoutComponent, UnauthorisedComponent],
    imports: [SharedModule, CommonModule, SecurityRoutingModule],
    providers: [AuthGuard]
})
export class SecurityModule {}
