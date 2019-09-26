import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MicVisualiserStubComponent } from './stubs/mic-visualiser-stub';
import { BackNavigationStubComponent } from './stubs/back-navigation-stub';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MicVisualiserStubComponent,
    BackNavigationStubComponent
  ]
})
export class TestingModule { }
