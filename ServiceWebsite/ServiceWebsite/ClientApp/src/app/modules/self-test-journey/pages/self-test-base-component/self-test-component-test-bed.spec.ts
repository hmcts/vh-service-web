import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import {SelfTestJourneySteps} from '../../self-test-journey-steps';
import {ComponentFixture} from '@angular/core/testing';
import {SelfTestJourney} from '../../self-test-journey';
import {DeviceType} from '../../../base-journey/services/device-type';
import {
  JourneyComponentTestBed,
  ComponentTestBedConfiguration
} from 'src/app/modules/base-journey/components/journey-component-test-bed.spec';
import { ParticipantSuitabilityModel, SelfTestAnswers } from 'src/app/modules/base-journey/participant-suitability.model';

export interface SelfTestComponentTestBedConfiguration<TComponent> extends ComponentTestBedConfiguration<TComponent> {
  journey?: JourneyBase;
  model?: ParticipantSuitabilityModel;
}

export class SelfTestJourneyStubs {
  public static get default(): SelfTestJourney {
    const deviceType = jasmine.createSpyObj<DeviceType>(['isMobile']);
    deviceType.isMobile.and.returnValue(false);
    const model = { selfTest: new SelfTestAnswers() } as ParticipantSuitabilityModel;
    const journey = new SelfTestJourney(model);
    journey.startAt(SelfTestJourneySteps.SwitchOnCameraAndMicrophone);
    return journey;
  }
}

export class SelfTestJourneyComponentTestBed {
  static createComponent<TComponent>(config: SelfTestComponentTestBedConfiguration<TComponent>): ComponentFixture<TComponent> {
    const defaultJourney = SelfTestJourneyStubs.default;
    return new JourneyComponentTestBed()
      .createComponent({
        component: config.component,
        declarations: [
          ...(config.declarations || [])
        ],
        providers: [
          { provide: JourneyBase, useValue: config.journey || defaultJourney },
          { provide: ParticipantSuitabilityModel, useValue: config.model || defaultJourney.model },
          ...(config.providers || [])
        ],
        imports: config.imports
      });
  }
}
