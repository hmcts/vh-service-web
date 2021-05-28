import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../security/guards/auth.guard';
import { CheckingVideoHearingComponent } from './pages/checking-video-hearing/checking-video-hearing.component';

const routes: Routes = [{ path: 'checking-video-hearing', component: CheckingVideoHearingComponent, canActivate: [AuthGuard] }];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class BaseJourneyRoutingModule {}
