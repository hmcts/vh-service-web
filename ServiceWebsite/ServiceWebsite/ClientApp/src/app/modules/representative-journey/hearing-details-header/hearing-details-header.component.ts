import { HearingService } from './../services/hearing.service';
import { Component, OnInit } from '@angular/core';
import { RepresentativeJourney } from '../representative-journey';

@Component({
  selector: 'app-hearing-details-header',
  templateUrl: './hearing-details-header.component.html',
  styleUrls: ['./hearing-details-header.component.css']
})
export class HearingDetailsHeaderComponent implements OnInit {
  caseNumber: string;
  caseName: string;
  caseType: string;
  scheduledDateTime: Date;
  loaded = false;

  constructor(private journey: RepresentativeJourney, private service: HearingService) {
  }

  async ngOnInit() {
    const hearing = await this.service.getHearing(this.journey.model.hearing.id);
    this.caseName = hearing.caseName;
    this.caseNumber = hearing.caseNumber;
    this.caseType = hearing.caseType;
    this.scheduledDateTime = hearing.scheduledDateTime;
    this.loaded = true;
  }
}
