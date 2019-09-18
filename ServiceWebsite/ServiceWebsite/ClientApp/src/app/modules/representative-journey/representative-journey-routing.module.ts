import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Paths } from './paths';

// components
import { AnswersSavedComponent } from './pages/answers-saved/answers-saved.component';
import { YourComputerComponent } from './pages/your-computer/your-computer.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { RepresentativeGuard } from './representative.gaurd';

const routes: Routes = [
  { path: Paths.YourComputer, component: YourComputerComponent, canActivate: [RepresentativeGuard] },
  { path: Paths.AnswersSaved, component: AnswersSavedComponent, canActivate: [RepresentativeGuard] },
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
