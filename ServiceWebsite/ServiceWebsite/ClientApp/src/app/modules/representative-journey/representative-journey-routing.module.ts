import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Paths } from './paths';

// components
// import { AnswersSavedComponent } from './pages/answers-saved/answers-saved.component';
import { PresentingTheCaseComponent } from './pages/presenting-the-case/presenting-the-case.component';
import { OtherInformationComponent } from './pages/other-information/other-information.component';
import { YourVideoHearingComponent } from './pages/your-video-hearing/your-video-hearing.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { RepresentativeGuard } from './representative.gaurd';

const routes: Routes = [
    // { path: Paths.AnswersSaved, component: AnswersSavedComponent, canActivate: [RepresentativeGuard] },
    { path: Paths.YourVideoHearing, component: YourVideoHearingComponent, canActivate: [RepresentativeGuard] },
    { path: Paths.PresentingTheCase, component: PresentingTheCaseComponent, canActivate: [RepresentativeGuard] },
    { path: Paths.OtherInformation, component: OtherInformationComponent, canActivate: [RepresentativeGuard] },
    { path: Paths.ThankYou, component: ThankYouComponent, canActivate: [RepresentativeGuard] }
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forChild(routes)
    ],
})
export class RepresentativeJourneyRoutingModule {
}
