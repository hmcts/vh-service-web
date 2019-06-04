import { Component, OnInit } from '@angular/core';
import { RepresentativeJourney } from '../representative-journey';
import * as moment from 'moment';

@Component({
  selector: 'app-hearing-details-header',
  templateUrl: './hearing-details-header.component.html',
  styleUrls: ['./hearing-details-header.component.css']
})
export class HearingDetailsHeaderComponent implements OnInit {
  caseNumber: string;
  caseName: string;
  scheduledDate: string;
  scheduledTime: string;

  constructor(private journey: RepresentativeJourney) { }

  ngOnInit() {
    const hearing = this.journey.model.hearing;
    this.caseName = hearing.caseName;
    this.caseNumber = hearing.caseNumber;

    // different format from what's used in the other datetime places
    this.scheduledDate = moment(hearing.scheduleDateTime).format('D MMMM YYYY');
    this.scheduledTime = moment(hearing.scheduleDateTime).format('hh:mm');
  }
}
