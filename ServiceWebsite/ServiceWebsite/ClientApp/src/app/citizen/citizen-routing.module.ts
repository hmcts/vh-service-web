import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const citizenRoutes: Routes = [
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(citizenRoutes)
  ],
})
export class CitizenRoutingModule {
}
