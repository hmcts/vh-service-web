import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Paths } from './paths';

// components
import { AboutVideoHearingsComponent } from './pages/about-video-hearings/about-video-hearings.component';
import { AboutYouAndYourClientComponent } from './pages/about-you-and-your-client/about-you-and-your-client.component';
import { AboutYouComponent } from './pages/about-you/about-you.component';
import { AccessToRoomComponent } from './pages/access-to-room/access-to-room.component';
import { AboutYourClientComponent } from './pages/about-your-client/about-your-client.component';
import { ClientAttendanceComponent } from './pages/client-attendance/client-attendance.component';
import { HearingSuitabilityComponent } from './pages/hearing-suitability/hearing-suitability.component';
import { QuestionnaireCompletedComponent } from './pages/questionnaire-completed/questionnaire-completed.component';
import { YourComputerComponent } from './pages/your-computer/your-computer.component';
import { AboutYourComputerComponent } from './pages/about-your-computer/about-your-computer.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { PleaseContactUsComponent } from './pages/please-contact-us/please-contact-us.component';
import { RepresentativeGuard } from './representative.gaurd';

const routes: Routes = [
  { path: Paths.AboutVideoHearings, component: AboutVideoHearingsComponent, canActivate: [RepresentativeGuard] },
  { path: Paths.AboutYouAndYourClient, component: AboutYouAndYourClientComponent, canActivate: [RepresentativeGuard] },
  { path: Paths.AboutYou, component: AboutYouComponent, canActivate: [RepresentativeGuard] },
  { path: Paths.AccessToRoom, component: AccessToRoomComponent, canActivate: [RepresentativeGuard] },
  { path: Paths.AboutYourClient, component: AboutYourClientComponent, canActivate: [RepresentativeGuard] },
  { path: Paths.ClientAttendance, component: ClientAttendanceComponent, canActivate: [RepresentativeGuard] },
  { path: Paths.HearingSuitability, component: HearingSuitabilityComponent, canActivate: [RepresentativeGuard] },
  { path: Paths.YourComputer, component: YourComputerComponent, canActivate: [RepresentativeGuard] },
  { path: Paths.AboutYourComputer, component: AboutYourComputerComponent, canActivate: [RepresentativeGuard] },
  { path: Paths.QuestionnaireCompleted, component: QuestionnaireCompletedComponent, canActivate: [RepresentativeGuard] },
  { path: Paths.ThankYou, component: ThankYouComponent, canActivate: [RepresentativeGuard] },
  { path: Paths.ContactUs, component: PleaseContactUsComponent, canActivate: [RepresentativeGuard] }
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
