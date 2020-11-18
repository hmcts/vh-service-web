import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Paths } from './paths';

import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { IndividualGuard } from './individual.gaurd';

const routes: Routes = [{ path: Paths.ThankYou, component: ThankYouComponent, canActivate: [IndividualGuard] }];

export const Components = [ThankYouComponent];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class IndividualJourneyRoutingModule {}
