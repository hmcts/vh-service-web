import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { IndividualJourneyRoutingModule } from './individual-journey-routing.module';
import { IndividualJourneySteps, IndividualJourney } from './individual-journey';
import { Paths } from './paths';
import { AboutHearingsComponent } from './about-hearings/about-hearings.component';
import { InformationVideoComponent } from './information-video/information-video.component';

@Injectable()
class JourneyPageBinder {
  private readonly routes = new Map<IndividualJourneySteps, string>();

  constructor(journey: IndividualJourney, private router: Router) {
    journey.redirect.subscribe((step: IndividualJourneySteps) => this.goto(step));
    this.routes[IndividualJourneySteps.AboutHearings] = Paths.AboutHearings;
    this.routes[IndividualJourneySteps.InformationVideo] = Paths.InformationVideo;
  }

  goto(step: IndividualJourneySteps) {
    console.log(`going to step ${step} of journey`);
    const route = this.routes[step];
    if (route) {
      this.router.navigate([ route ]);
    } else {
      throw Error('Unrecognized journey step, no defined route found: ' + step.toString());
    }
  }
}

@NgModule({
  imports: [
    // angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    // app
    SharedModule,
    IndividualJourneyRoutingModule,
  ],
  declarations: [
    AboutHearingsComponent,
    InformationVideoComponent
  ],
  providers: [
    IndividualJourney,
    JourneyPageBinder
  ]
 })
export class IndividualJourneyModule {
}
