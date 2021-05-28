import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JourneySelectorComponent } from './journey-selector/journey-selector.component';
import { AuthGuard } from './modules/security/guards/auth.guard';
import { AccessibilityComponent } from './pages/accessibility/accessibility.component';
import { ErrorComponent } from './pages/error/error.component';
import { GuidanceComponent } from './pages/guidance/guidance.component';
import { HomeComponent } from './pages/home/home.component';
import { MediaErrorComponent } from './pages/media-error/media-error.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { QuestionnaireAlreadyCompletedComponent } from './pages/questionnaire-already-completed/questionnaire-already-completed.component';
import { SignInOnComputerComponent } from './pages/sign-in-on-computer/sign-in-on-computer.component';
import { UnsupportedBrowserComponent } from './pages/unsupported-browser/unsupported-browser.component';
import { Paths } from './paths';

export const routes: Routes = [
    { path: '', redirectTo: `${Paths.JourneySelector}`, pathMatch: 'full' },
    { path: Paths.Home, component: HomeComponent },
    { path: Paths.JourneySelector, component: JourneySelectorComponent, canActivate: [AuthGuard] },
    { path: Paths.Error, component: ErrorComponent },
    { path: Paths.PrivacyPolicy, component: PrivacyPolicyComponent },
    { path: Paths.Accessibility, component: AccessibilityComponent },
    { path: Paths.PageNotFound, component: PageNotFoundComponent },
    { path: Paths.Guidance, component: GuidanceComponent, canActivate: [AuthGuard] },
    { path: Paths.SignInOnComputer, component: SignInOnComputerComponent, canActivate: [AuthGuard] },
    { path: `${Paths.Guidance}/:print`, component: GuidanceComponent },
    { path: Paths.MediaError, component: MediaErrorComponent, canActivate: [AuthGuard] },
    { path: Paths.EquipmentBlocked, component: MediaErrorComponent, canActivate: [AuthGuard] },
    { path: `${Paths.UnsupportedBrowser}`, component: UnsupportedBrowserComponent },
    { path: Paths.QuestionnaireAlreadyCompleted, component: QuestionnaireAlreadyCompletedComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: Paths.PageNotFound, pathMatch: 'full' }
];

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot(routes, {
            onSameUrlNavigation: 'reload',
            scrollPositionRestoration: 'enabled'
        })
    ]
})
export class AppRoutingModule {}
