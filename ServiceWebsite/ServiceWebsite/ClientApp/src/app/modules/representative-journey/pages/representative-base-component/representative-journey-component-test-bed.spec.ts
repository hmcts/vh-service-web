import { TestLogger } from './../../../../services/logger.spec';
import { MutableRepresentativeSuitabilityModel } from '../../mutable-representative-suitability.model';
import { ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

import { RepresentativeJourney } from '../../representative-journey';
import { RepresentativeSuitabilityModel } from '../../representative-suitability.model';
import { Hearing, SelfTestAnswers } from '../../../base-journey/participant-suitability.model';
import { RepresentativeStepsOrderFactory } from '../../representative-steps-order.factory';
import {
  ComponentTestBedConfiguration,
  JourneyComponentTestBed
} from 'src/app/modules/base-journey/components/journey-component-test-bed.spec';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';
import { SubmitService } from '../../services/submit.service';

@Component({ selector: 'app-hearing-details-header', template: '' })
export class StubHearingDetailsHeaderComponent { }

export interface RepresentativeComponentTestBedConfiguration<TComponent> extends ComponentTestBedConfiguration<TComponent> {
  journey?: RepresentativeJourney;
}

export class RepresentativeJourneyStubs {
  public static get default(): RepresentativeJourney {
    // Journey with initialised model, so that it is accessible in steeps
    const representativeStepsOrderFactory = new RepresentativeStepsOrderFactory();
    let submitService: jasmine.SpyObj<SubmitService>;
    submitService = jasmine.createSpyObj<SubmitService>(['submit']);
    const journey = new RepresentativeJourney(representativeStepsOrderFactory, submitService, TestLogger);
    journey.forSuitabilityAnswers([RepresentativeJourneyStubs.model]);
    journey.startAt(RepresentativeJourneySteps.AboutVideoHearings);
    return journey;
  }

  public static get model(): RepresentativeSuitabilityModel {
    const model = new MutableRepresentativeSuitabilityModel();
    model.hearing = new Hearing('hearingId', new Date(2099, 1, 1, 12, 0));
    model.selfTest = new SelfTestAnswers();
    return model;
  }

  public static get journeySpy(): jasmine.SpyObj<RepresentativeJourney> {
    return {
      model: RepresentativeJourneyStubs.model,
      ...jasmine.createSpyObj<RepresentativeJourney>(['next', 'goto', 'submitQuestionnaire'])
    } as jasmine.SpyObj<RepresentativeJourney>;
  }
}

export class RepresentativeJourneyComponentTestBed {
  static createComponent<TComponent>(config: RepresentativeComponentTestBedConfiguration<TComponent>): ComponentFixture<TComponent> {
    return new JourneyComponentTestBed()
      .createComponent({
        component: config.component,
        declarations: [
          StubHearingDetailsHeaderComponent,
          ...(config.declarations || [])
        ],
        providers: [
          { provide: RepresentativeSuitabilityModel, useClass: MutableRepresentativeSuitabilityModel },
          { provide: RepresentativeJourney, useValue: config.journey || RepresentativeJourneyStubs.default },
          ...(config.providers || [])
        ],
        imports: config.imports
      });
  }
}
