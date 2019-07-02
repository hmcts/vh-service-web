import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorModule } from 'ngx-device-detector';

// components
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { ErrorFooterComponent } from './error-footer/error-footer.component';
import { BackNavigationComponent } from './back-navigation/back-navigation.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CrestBluePanelComponent } from './crest-blue-panel/crest-blue-panel.component';
import { BetaBannerComponent} from './beta-banner/beta-banner.component';

// services
import { ProfileService } from '../../services/profile.service';
import { PageTrackerService } from '../../services/page-tracker.service';
import { WindowRef } from './window-ref';
import { LongDatetimePipe } from './date-time.pipe';
import { AppYesNoPipe } from './boolean.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule.forRoot(),
    DeviceDetectorModule.forRoot(),
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    BackNavigationComponent,
    ShowDetailsComponent,
    ErrorFooterComponent,
    ContactUsComponent,
    CrestBluePanelComponent,
    LongDatetimePipe,
    AppYesNoPipe,
    BetaBannerComponent
  ],
  providers: [
    ProfileService,
    PageTrackerService,
    WindowRef
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    BackNavigationComponent,
    ShowDetailsComponent,
    ErrorFooterComponent,
    ContactUsComponent,
    CrestBluePanelComponent,
    LongDatetimePipe,
    AppYesNoPipe,
    BetaBannerComponent
  ]
})
export class SharedModule { }
