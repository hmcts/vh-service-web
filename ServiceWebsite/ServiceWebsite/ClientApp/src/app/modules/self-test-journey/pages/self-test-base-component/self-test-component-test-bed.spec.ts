import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import {SelfTestJourneySteps} from '../../self-test-journey-steps';
import {ComponentFixture} from '@angular/core/testing';
import {SelfTestJourney} from '../../self-test-journey';
import {SelfTestStepsOrderFactory} from '../../self-test-steps-order.factory';
import {DeviceType} from '../../../base-journey/services/device-type';
import {
  JourneyComponentTestBed,
  ComponentTestBedConfiguration
} from 'src/app/modules/base-journey/components/journey-component-test-bed.spec';
import {ContinuableComponentFixture} from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';
import { ParticipantSuitabilityModel, SelfTestAnswers } from 'src/app/modules/base-journey/participant-suitability.model';

export interface SelfTestComponentTestBedConfiguration<TComponent> extends ComponentTestBedConfiguration<TComponent> {
  journey?: JourneyBase;
  model?: ParticipantSuitabilityModel;
}

export class CommonSelfTestComponentTests {
  static continuesWhenButtonIsPressed<TComponent>(config: ComponentTestBedConfiguration<TComponent>) {
    const journey = jasmine.createSpyObj<JourneyBase>(['next']);
    const fixture = SelfTestJourneyComponentTestBed.createComponent({
      component: config.component,
      providers: config.providers,
      imports: config.imports,
      declarations: config.declarations,
      journey: journey
    });

    fixture.detectChanges();
    new ContinuableComponentFixture(fixture).submitIsClicked();
    expect(journey.next).toHaveBeenCalled();
  }
}

export class SelfTestJourneyStubs {
  public static get default(): SelfTestJourney {
    const deviceType = jasmine.createSpyObj<DeviceType>(['isMobile']);
    const stepsOrderFactory = new SelfTestStepsOrderFactory(deviceType);
    deviceType.isMobile.and.returnValue(false);
    const model = { selfTest: new SelfTestAnswers() } as ParticipantSuitabilityModel;
    const journey = new SelfTestJourney(model, stepsOrderFactory);
    journey.startAt(SelfTestJourneySteps.UseCameraAndMicrophoneAgain);
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
