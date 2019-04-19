import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const professionalCitizenRoutes: Routes = [
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(professionalCitizenRoutes)
  ],
})
export class ProfessionalCitizenRoutingModule {
}
