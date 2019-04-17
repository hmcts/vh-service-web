import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const professionalRoutes: Routes = [
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
