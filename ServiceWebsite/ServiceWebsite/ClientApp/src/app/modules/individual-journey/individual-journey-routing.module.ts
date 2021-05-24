import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndividualGuard } from './individual.gaurd';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { Paths } from './paths';

const routes: Routes = [{ path: Paths.ThankYou, component: ThankYouComponent, canActivate: [IndividualGuard] }];

export const Components = [ThankYouComponent];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class IndividualJourneyRoutingModule {}
