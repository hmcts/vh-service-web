import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './error/error.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './error/page-not-found.component';
import { GuidanceComponent } from './guidance/guidance.component';
import { OtherInformationComponent } from './other-information/other-information.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: 'guidance', component: GuidanceComponent },
  { path: 'guidance/:print', component: GuidanceComponent },
  { path: 'other-information', component: OtherInformationComponent },
  { path: '**', redirectTo: 'page-not-found', pathMatch: 'full' }
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
