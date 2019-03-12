import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CheckSuitabilityForVideoComponent } from './check-suitability-for-video/check-suitability-for-video.component';
import { ChecklistConsentComponent } from './checklist-consent/checklist-consent.component';
import { AbilityToTakePartComponent } from './ability-to-take-part-component/ability-to-take-part.component';
import { AboutYourEquipmentComponent } from 'src/app/about-your-equipment/about-your-equipment.component';
import { IsHearingSuitableForVideoComponent } from './is-hearing-suitable-for-video/is-hearing-suitable-for-video.component';
import { CheckEquipmentComponent } from './check-equipment/check-equipment.component';
import { AboutYourClientComponent } from './about-your-client/about-your-client.component';
import { WillClientNeedInterpreterComponent } from './will-client-need-interpreter/will-client-need-interpreter.component';
import { UseSameComputerComponent } from 'src/app/use-same-computer/use-same-computer.component';
import { UseSameComputerSignoutComponent } from 'src/app/use-same-computer/use-same-computer-signout.component';

import { SharedModule } from './shared/shared.module';
import { ProfessionalRoutingModule } from './professional-routing.module';

@NgModule({
  declarations: [
    CheckSuitabilityForVideoComponent,
    ChecklistConsentComponent,
    AbilityToTakePartComponent,
    AboutYourEquipmentComponent,
    IsHearingSuitableForVideoComponent,
    CheckEquipmentComponent,
    WillClientNeedInterpreterComponent,
    AboutYourClientComponent,
    UseSameComputerComponent,
    UseSameComputerSignoutComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ProfessionalRoutingModule,
  ],

})
export class ProfessionalModule {
}
