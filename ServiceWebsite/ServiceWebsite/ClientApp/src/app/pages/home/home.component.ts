import { ProfileService } from 'src/app/services/profile.service';
import { Component, OnInit } from '@angular/core';
import { JourneyFactory } from 'src/app/modules/base-journey/services/journey.factory';

@Component({
  selector: 'app-home',
  template: ''
})
export class HomeComponent implements OnInit {
  constructor(private journeyFactory: JourneyFactory, private profileService: ProfileService) {}

  async ngOnInit() {
    const profile = await this.profileService.getUserProfile();
    const journey = this.journeyFactory.getJourney(profile.role);
    journey.begin();
    // mock to individual user
    // const currentUserType = 'Individual';
    // this.journeyFactory.getJourney(currentUserType).begin();
  }
}

