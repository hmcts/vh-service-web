import { TestLogger } from '../../../../services/logger.spec';
import { ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

import { RepresentativeJourney } from '../../representative-journey';
import { ParticipantSuitabilityModel } from '../../../base-journey/participant-suitability.model';

import { Hearing, SelfTestAnswers } from '../../../base-journey/participant-suitability.model';
import {
  ComponentTestBedConfiguration,
  JourneyComponentTestBed
} from 'src/app/modules/base-journey/components/journey-component-test-bed.spec';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';
import { SubmitService } from '../../../base-journey/services/submit.service';

@Component({ selector: 'app-hearing-details-header', template: '' })
export class StubHearingDetailsHeaderComponent { }

export interface RepresentativeComponentTestBedConfiguration<TComponent> extends ComponentTestBedConfiguration<TComponent> {
  journey?: RepresentativeJourney;
}

export class RepresentativeJourneyStubs {
  public static get default(): RepresentativeJourney {
    // Journey with initialised model, so that it is accessible in steeps
    let submitService: jasmine.SpyObj<SubmitService>;
    submitService = jasmine.createSpyObj<SubmitService>(['submit']);
    const journey = new RepresentativeJourney(submitService, TestLogger);
    journey.forSuitabilityAnswers([RepresentativeJourneyStubs.model]);
    journey.startAt(RepresentativeJourneySteps.CheckingVideoHearing);
    return journey;
  }

  public static get model(): ParticipantSuitabilityModel {
    const model = new ParticipantSuitabilityModel();
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
          { provide: RepresentativeJourney, useValue: config.journey || RepresentativeJourneyStubs.default },
          ...(config.providers || [])
        ],
        imports: config.imports
      });
  }
}
