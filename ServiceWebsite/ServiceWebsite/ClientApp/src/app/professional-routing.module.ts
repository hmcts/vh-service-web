import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CheckSuitabilityForVideoComponent } from './check-suitability-for-video/check-suitability-for-video.component';
import { AbilityToTakePartComponent } from './ability-to-take-part-component/ability-to-take-part.component';
import { AboutYourEquipmentComponent } from 'src/app/about-your-equipment/about-your-equipment.component';
import { IsHearingSuitableForVideoComponent } from './is-hearing-suitable-for-video/is-hearing-suitable-for-video.component';
import { CheckEquipmentComponent } from './check-equipment/check-equipment.component';
import { AboutYourClientComponent } from './about-your-client/about-your-client.component';
import { WillClientNeedInterpreterComponent } from './will-client-need-interpreter/will-client-need-interpreter.component';
import { UseSameComputerComponent } from 'src/app/use-same-computer/use-same-computer.component';
import { UseSameComputerSignoutComponent } from 'src/app/use-same-computer/use-same-computer-signout.component';

const professionalRoutes: Routes = [
  { path: 'hearing-suitability-check', component: CheckSuitabilityForVideoComponent },
  { path: 'use-same-computer', component: UseSameComputerComponent },
  { path: 'use-same-computer-signout', component: UseSameComputerSignoutComponent },
  { path: 'about-your-equipment', component: AboutYourEquipmentComponent },
  { path: 'compatibility-check', component: CheckEquipmentComponent },
  { path: 'will-client-attend', component: AboutYourClientComponent },
  { path: 'will-client-need-interpreter', component: WillClientNeedInterpreterComponent },
  { path: 'ability-to-check', component: AbilityToTakePartComponent },
  { path: 'is-hearing-suitable-for-video', component: IsHearingSuitableForVideoComponent },
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(professionalRoutes)
  ],
})
export class ProfessionalRoutingModule {
}
