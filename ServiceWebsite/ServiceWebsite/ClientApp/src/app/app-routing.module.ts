import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './error/error.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './error/page-not-found.component';
import { GuidanceComponent } from './guidance/guidance.component';
import { Paths } from './paths';

export const routes: Routes = [
  { path: '', redirectTo: Paths.Home, pathMatch: 'full' },
  { path: Paths.Home, component: HomeComponent },
  { path: Paths.Error, component: ErrorComponent },
  { path: Paths.PrivacyPolicy, component: PrivacyPolicyComponent },
  { path: Paths.PageNotFound, component: PageNotFoundComponent },
  { path: Paths.Guidance, component: GuidanceComponent },
  { path: `${Paths.Guidance}/:print`, component: GuidanceComponent },
  { path: '**', redirectTo: Paths.PageNotFound, pathMatch: 'full' }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
  ],
})
export class AppRoutingModule {
}
