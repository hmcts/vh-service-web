import { ProfileService } from 'src/app/services/profile.service';
import { Component, OnInit } from '@angular/core';
import { JourneySelector } from 'src/app/modules/base-journey/services/journey.selector';

@Component({
  selector: 'app-home',
  template: ''
})
export class HomeComponent implements OnInit {
  constructor(private journeySelector: JourneySelector, private profileService: ProfileService) {}

  async ngOnInit() {
    const profile = await this.profileService.getUserProfile();
    const journey = await this.journeySelector.getJourney(profile.email, profile.role);
    journey.begin();
  }
}

