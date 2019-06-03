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

const routes: Routes = [
  { path: Paths.AboutVideoHearings, component: AboutVideoHearingsComponent },
  { path: Paths.AboutYouAndYourClient, component: AboutYouAndYourClientComponent },
  { path: Paths.AboutYou, component: AboutYouComponent },
  { path: Paths.AccessToRoom, component: AccessToRoomComponent },
  { path: Paths.AboutYourClient, component: AboutYourClientComponent },
  { path: Paths.ClientAttendance, component: ClientAttendanceComponent },
  { path: Paths.HearingSuitability, component: HearingSuitabilityComponent },
  { path: Paths.YourComputer, component: YourComputerComponent },
  { path: Paths.AboutYourComputer, component: AboutYourComputerComponent },
  { path: Paths.QuestionnaireCompleted, component: QuestionnaireCompletedComponent },
  { path: Paths.ThankYou, component: ThankYouComponent },
  { path: Paths.ContactUs, component: PleaseContactUsComponent }
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
