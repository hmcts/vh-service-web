import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// components
import { FooterComponent } from '../shared/footer/footer.component';
import { HeaderComponent } from '../shared/header/header.component';
import { BackNavigationComponent } from '../back-navigation/back-navigation.component';
import { ShowDetailsComponent } from '../shared/show-details/show-details.component';
import { ErrorFooterComponent } from '../shared/error-footer/error-footer.component';

// services
import { ProfileService } from '../services/profile.service';
import { SessionStorage } from '../services/session-storage';
import { PageTrackerService } from '../services/page-tracker.service';
import { SpeedTestService } from '../services/speedtest.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    BackNavigationComponent,
    ShowDetailsComponent,
    ErrorFooterComponent,
  ],
  providers: [
    ProfileService,
    SessionStorage,
    PageTrackerService,
    SpeedTestService,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    BackNavigationComponent,
    ShowDetailsComponent,
    ErrorFooterComponent,
    ]
})
export class SharedModule { }
