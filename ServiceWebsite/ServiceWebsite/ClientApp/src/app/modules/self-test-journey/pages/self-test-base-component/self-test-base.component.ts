import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import {OnInit, Injectable} from '@angular/core';
import {ParticipantSuitabilityModel} from '../../../base-journey/participant-suitability.model';

@Injectable()
export abstract class SelfTestBaseComponent implements OnInit {
  constructor(private journey: JourneyBase, private suitabilityModel: ParticipantSuitabilityModel) {
  }

  ngOnInit(): void {
  }

  continue(): void {
    this.journey.next();
  }

  get model(): ParticipantSuitabilityModel {
    return this.suitabilityModel;
  }
}
