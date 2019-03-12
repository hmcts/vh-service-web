import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// components
import { FooterComponent } from '../shared/footer/footer.component';
import { HeaderComponent } from '../shared/header/header.component';
import { ChecklistFooterComponent } from '../shared/checklist-footer/checklist-footer.component';
import { BackNavigationComponent } from '../back-navigation/back-navigation.component';
import { ChecklistStepsComponent } from '../checklist-steps/checklist-steps.component';
import { BeforeunloadComponent } from '../shared/beforeunload/beforeunload.component';
import { ProgressbarBasicComponent } from '../shared/progressbar/progressbar-basic.component';
import { ShowDetailsComponent } from '../shared/show-details/show-details.component';
import { ErrorFooterComponent } from '../shared/error-footer/error-footer.component';

// services
import { ProfileService } from '../services/profile.service';
import { SessionStorage } from '../services/session-storage';
import { HearingService } from '../services/hearing.service';
import { ChecklistService } from '../services/checklist.service';
import { ChecklistSessionService } from '../services/checklist-session.service';
import { NavigatorService } from '../check-equipment/navigator.service';
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
    ChecklistFooterComponent,
    BackNavigationComponent,
    ChecklistStepsComponent,
    BeforeunloadComponent,
    ProgressbarBasicComponent,
    ShowDetailsComponent,
    ErrorFooterComponent,
  ],
  providers: [
    ProfileService,
    SessionStorage,
    HearingService,
    ChecklistService,
    ChecklistSessionService,
    PageTrackerService,
    NavigatorService,
    SpeedTestService,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ChecklistFooterComponent,
    BackNavigationComponent,
    ChecklistStepsComponent,
    BeforeunloadComponent,
    ProgressbarBasicComponent,
    ShowDetailsComponent,
    ErrorFooterComponent,
    ]
})
export class SharedModule { }
