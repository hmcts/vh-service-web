import {SelfTestJourneySteps} from '../../self-test-journey-steps';
import {SelfTestModel} from '../../self-test.model';
import {ComponentFixture} from '@angular/core/testing';
import {SelfTestJourney} from '../../self-test-journey';
import {SelfTestStepsOrderFactory} from '../../self-test-steps-order.factory';
import {DeviceType} from '../../../base-journey/services/device-type';
import {
  JourneyComponentTestBed,
  ComponentTestBedConfiguration
} from 'src/app/modules/base-journey/components/journey-component-test-bed.spec';
import {ContinuableComponentFixture} from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';
import {Localisation} from '../../../shared/localisation';
import {IndividualLocalisation} from '../../../individual-journey/services/individual-localisation';

export interface SelfTestComponentTestBedConfiguration<TComponent> extends ComponentTestBedConfiguration<TComponent> {
  journey?: SelfTestJourney;
}

export class CommonSelfTestComponentTests {
  static continuesWhenButtonIsPressed<TComponent>(config: ComponentTestBedConfiguration<TComponent>) {
    const journey = jasmine.createSpyObj<SelfTestJourney>(['next']);
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
    const journey = new SelfTestJourney(stepsOrderFactory);
    journey.startAt(SelfTestJourneySteps.UseCameraAndMicrophoneAgain);
    return journey;
  }

  public static get model(): SelfTestModel {
    const journeyModel = new SelfTestModel();
    journeyModel.internet = true;
    return journeyModel;
  }

  public static get journeySpy(): jasmine.SpyObj<SelfTestJourney> {
    return {
      model: SelfTestJourneyStubs.model,
      ...jasmine.createSpyObj<SelfTestJourney>(['next'])
    } as jasmine.SpyObj<SelfTestJourney>;
  }
}

export class SelfTestJourneyComponentTestBed {
  static createComponent<TComponent>(config: SelfTestComponentTestBedConfiguration<TComponent>): ComponentFixture<TComponent> {
    return new JourneyComponentTestBed()
      .createComponent({
        component: config.component,
        declarations: [
          ...(config.declarations || [])
        ],
        providers: [
          {provide: SelfTestModel, useClass: SelfTestModel},
          { provide: Localisation, useClass: IndividualLocalisation },
          {provide: SelfTestJourney, useValue: config.journey || SelfTestJourneyStubs.default},
          ...(config.providers || [])
        ],
        imports: config.imports
      });
  }
}
