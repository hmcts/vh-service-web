import { Constants } from './../../modules/shared/constants';
import { Component, OnInit } from '@angular/core';
import { JourneyFactory } from 'src/app/modules/base-journey/services/journey.factory';

@Component({
  selector: 'app-home',
  template: ''
})
export class HomeComponent implements OnInit {
  constructor(private journeyFactory: JourneyFactory) {}

  ngOnInit() {
    // mock to citizen
    const currentUserType = Constants.UserType.Citizen;
    this.journeyFactory.getJourney(currentUserType).begin();
  }
}

