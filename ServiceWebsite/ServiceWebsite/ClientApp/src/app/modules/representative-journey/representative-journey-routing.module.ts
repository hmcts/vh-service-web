import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { Paths } from './paths';
import { RepresentativeGuard } from './representative.gaurd';

const routes: Routes = [{ path: Paths.ThankYou, component: ThankYouComponent, canActivate: [RepresentativeGuard] }];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class RepresentativeJourneyRoutingModule {}
