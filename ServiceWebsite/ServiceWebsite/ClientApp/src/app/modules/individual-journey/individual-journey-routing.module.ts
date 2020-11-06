import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Paths } from './paths';

import { AboutHearingsComponent } from './pages/about-hearings/about-hearings.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { IndividualGuard } from './individual.gaurd';

const routes: Routes = [
    { path: Paths.AboutHearings, component: AboutHearingsComponent, canActivate: [IndividualGuard] },
    { path: Paths.ThankYou, component: ThankYouComponent, canActivate: [IndividualGuard] }
];

export const Components = [AboutHearingsComponent, ThankYouComponent];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class IndividualJourneyRoutingModule {}
