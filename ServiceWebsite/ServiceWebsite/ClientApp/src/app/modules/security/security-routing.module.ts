import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { Paths } from './paths';
import { ReturnUrlService } from './return-url.service';
import { UnauthorisedComponent } from './unauthorized/unauthorised.component';

const securityRoutes: Routes = [
    { path: Paths.Login, component: LoginComponent },
    { path: Paths.Logout, component: LogoutComponent },
    { path: Paths.Unauthorised, component: UnauthorisedComponent }
];

@NgModule({
    exports: [RouterModule],
    providers: [ReturnUrlService],
    imports: [RouterModule.forChild(securityRoutes)]
})
export class SecurityRoutingModule {}
