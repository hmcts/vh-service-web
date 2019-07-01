import { IndividualJourneySteps } from '../../individual-journey-steps';
import { MutableIndividualSuitabilityModel } from '../../mutable-individual-suitability.model';
import { ComponentFixture } from '@angular/core/testing';

import { IndividualLocalisation } from '../../services/individual-localisation';
import { Localisation } from 'src/app/modules/shared/localisation';
import { IndividualJourney } from '../../individual-journey';
import { Hearing } from '../../../base-journey/participant-suitability.model';
import { IndividualStepsOrderFactory } from '../../individual-steps-order.factory';
import { DeviceType } from '../../../base-journey/services/device-type';
import { IndividualSuitabilityModel } from '../../individual-suitability.model';
import {
  JourneyComponentTestBed,
  ComponentTestBedConfiguration
} from 'src/app/modules/base-journey/components/journey-component-test-bed.spec';
import { LongDatetimePipe } from 'src/app/modules/shared/date-time.pipe';
import { ContinuableComponentFixture } from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';
import { SubmitService } from '../../services/submit.service';

export interface IndividualComponentTestBedConfiguration<TComponent> extends ComponentTestBedConfiguration<TComponent> {
  journey?: IndividualJourney;
}

export class CommonIndividualComponentTests {
  static continuesWhenButtonIsPressed<TComponent>(config: ComponentTestBedConfiguration<TComponent>) {
    const journey = jasmine.createSpyObj<IndividualJourney>(['next']);
    const fixture = IndividualJourneyComponentTestBed.createComponent({
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

export class IndividualJourneyStubs {
  public static get default(): IndividualJourney {
    const deviceType = jasmine.createSpyObj<DeviceType>(['isMobile']);
    const individualStepsOrderFactory = new IndividualStepsOrderFactory(deviceType);
    deviceType.isMobile.and.returnValue(false);
    let submitService: jasmine.SpyObj<SubmitService>;
    submitService = jasmine.createSpyObj<SubmitService>(['submit']);
    const journey = new IndividualJourney(individualStepsOrderFactory, submitService);
    journey.forSuitabilityAnswers([IndividualJourneyStubs.model]);
    journey.startAt(IndividualJourneySteps.AboutHearings);
    return journey;
  }

  public static get model(): IndividualSuitabilityModel {
    const journeyModel = new MutableIndividualSuitabilityModel();
    journeyModel.hearing = new Hearing('hearingId', new Date(2099, 1, 1, 12, 0));
    return journeyModel;
  }

  public static get journeySpy(): jasmine.SpyObj<IndividualJourney> {
    return {
      model: IndividualJourneyStubs.model,
      ...jasmine.createSpyObj<IndividualJourney>(['next'])
    } as jasmine.SpyObj<IndividualJourney>;
  }
}

export class IndividualJourneyComponentTestBed {
  static createComponent<TComponent>(config: IndividualComponentTestBedConfiguration<TComponent>): ComponentFixture<TComponent> {
    return new JourneyComponentTestBed()
      .createComponent({
        component: config.component,
        declarations: [
          LongDatetimePipe,
          ...(config.declarations || [])
        ],
        providers: [
          { provide: IndividualSuitabilityModel, useClass: MutableIndividualSuitabilityModel },
          { provide: Localisation, useClass: IndividualLocalisation },
          { provide: IndividualJourney, useValue: config.journey || IndividualJourneyStubs.default },
          ...(config.providers || [])
        ],
        imports: config.imports
      });
  }
}
