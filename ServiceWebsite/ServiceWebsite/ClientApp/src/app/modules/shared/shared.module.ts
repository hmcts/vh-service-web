import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DeviceDetectorModule } from 'ngx-device-detector';

// components
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { BackNavigationComponent } from './back-navigation/back-navigation.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CrestBluePanelComponent } from './crest-blue-panel/crest-blue-panel.component';
import { BetaBannerComponent} from './beta-banner/beta-banner.component';
import {SelectMediaDevicesComponent} from './select-media-devices/select-media-devices.component';

// services
import { ProfileService } from '../../services/profile.service';
import { PageTrackerService } from '../../services/page-tracker.service';
import { WindowRef } from './window-ref';
import { LongDatetimePipe } from './date-time.pipe';
import { AppYesNoPipe } from './boolean.pipe';
import {MicVisualiserComponent} from './mic-visualiser/mic-visualiser.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DeviceDetectorModule.forRoot(),
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    BackNavigationComponent,
    ShowDetailsComponent,
    ContactUsComponent,
    CrestBluePanelComponent,
    LongDatetimePipe,
    AppYesNoPipe,
    BetaBannerComponent,
    SelectMediaDevicesComponent,
    MicVisualiserComponent,
  ],
  providers: [
    ProfileService,
    PageTrackerService,
    WindowRef,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    BackNavigationComponent,
    ShowDetailsComponent,
    ContactUsComponent,
    CrestBluePanelComponent,
    LongDatetimePipe,
    AppYesNoPipe,
    BetaBannerComponent,
    SelectMediaDevicesComponent,
    MicVisualiserComponent
  ]
})
export class SharedModule { }
