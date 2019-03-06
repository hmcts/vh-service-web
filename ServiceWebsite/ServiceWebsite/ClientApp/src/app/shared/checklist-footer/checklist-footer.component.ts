import { Component, OnInit, Input } from '@angular/core';
import { HearingService } from '../../services/hearing.service';
import { LocaleResources } from '../../shared/resources/locale-resources';
import { CONFIG } from '../../shared/config';
import { Constants } from '../../shared/constants';

@Component({
  selector: 'app-checklist-footer',
  templateUrl: './checklist-footer.component.html'
})
export class ChecklistFooterComponent implements OnInit {

  @Input()
  isUserProfessional: boolean = true;

  caseNumber: string;
  localeResources: any;
  showTextDetails: boolean = false;
  contactUsEmail: string;

  constructor(private hearingDetails: HearingService) {
    this.localeResources = LocaleResources[CONFIG.Locale];
    this.contactUsEmail = Constants.ContactUsEmail;
  }

  ngOnInit() {
    this.hearingDetails.getNextHearingDetails().then(details => {
      this.caseNumber = details.caseNumber;
    });
  }

  showDetails() {
    this.showTextDetails = !this.showTextDetails;
  }
}



