import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './pages/error/error.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { GuidanceComponent } from './pages/guidance/guidance.component';
import { MediaErrorComponent } from './pages/media-error/media-error.component';
import { QuestionnaireAlreadyCompletedComponent } from './pages/questionnaire-already-completed/questionnaire-already-completed.component';
import { AccessibilityComponent } from './pages/accessibility/accessibility.component';
import { SignInOnComputerComponent } from './pages/sign-in-on-computer/sign-in-on-computer.component';

import { Paths } from './paths';
import { UnsupportedBrowserComponent } from './pages/unsupported-browser/unsupported-browser.component';

export const routes: Routes = [
  { path: Paths.Root, component: HomeComponent, pathMatch: 'full' },
  { path: Paths.Error, component: ErrorComponent },
  { path: Paths.PrivacyPolicy, component: PrivacyPolicyComponent },
  { path: Paths.Accessibility, component: AccessibilityComponent },
  { path: Paths.PageNotFound, component: PageNotFoundComponent },
  { path: Paths.Guidance, component: GuidanceComponent },
  { path: Paths.SignInOnComputer, component: SignInOnComputerComponent },
  { path: `${Paths.Guidance}/:print`, component: GuidanceComponent },
  { path: Paths.MediaError, component: MediaErrorComponent },
  { path: Paths.EquipmentBlocked, component: MediaErrorComponent },
  { path: `${Paths.UnsupportedBrowser}`, component: UnsupportedBrowserComponent },
  { path: Paths.QuestionnaireAlreadyCompleted, component: QuestionnaireAlreadyCompletedComponent },
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
