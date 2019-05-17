import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './pages/error/error.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { GuidanceComponent } from './pages/guidance/guidance.component';

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
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled' })
  ],
})
export class AppRoutingModule {
}
