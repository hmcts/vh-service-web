import { MutableIndividualSuitabilityModel } from '../../mutable-individual-suitability.model';
import { ComponentFixture, TestModuleMetadata } from '@angular/core/testing';
import { Type } from '@angular/core';

import { IndividualLocalisation } from '../../services/individual-localisation';
import { Localisation } from 'src/app/modules/shared/localisation';
import { IndividualJourney } from '../../individual-journey';
import { Hearing } from '../../../base-journey/participant-suitability.model';
import { IndividualStepsOrderFactory } from '../../individual-steps-order.factory';
import { DeviceType } from '../../services/device-type';
import { IndividualSuitabilityModel } from '../../individual-suitability.model';
import {
  JourneyComponentTestBed,
  ComponentTestBedConfiguration
} from 'src/app/modules/base-journey/components/journey-component-test-bed.spec';
import { LongDatetimePipe } from 'src/app/modules/shared/date-time.pipe';

export interface IndividualComponentTestBedConfiguration<TComponent> extends ComponentTestBedConfiguration<TComponent> {
  journey?: IndividualJourney;
}

export class IndividualJourneyStubs {
  public static get default(): IndividualJourney {
    const deviceType = jasmine.createSpyObj<DeviceType>(['isMobile']);
    const individualStepsOrderFactory = new IndividualStepsOrderFactory(deviceType);
    deviceType.isMobile.and.returnValue(false);
    const journey = new IndividualJourney(individualStepsOrderFactory);
    const journeyModel = new MutableIndividualSuitabilityModel();

    journeyModel.hearing = new Hearing('hearingId', new Date(2099, 1, 1, 12, 0));
    journey.forSuitabilityAnswers([journeyModel]);
    return journey;
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

/**
 * Helper to configure the testbed for any derivatives of the view base component.
 * @param component The type of component to prepare test bed for
 * @param customiseConfiguration A method to override any configuration required with, will be given the `TestModuleData` as a parameter
 */
const configureTestBedFor = <T>(component: Type<T>, customiseConfiguration?: Function): ComponentFixture<T> => {
  const config: TestModuleMetadata = {
    declarations: [],
    imports: [],
    providers: []
  };

  if (customiseConfiguration) {
    customiseConfiguration(config);
  }

  return IndividualJourneyComponentTestBed.createComponent({
    component: component,
    declarations: config.declarations,
    imports: config.imports,
    providers: config.providers
  });
};

/**
 * Helper method to quickly test if the component can be created, setting up a test bed and everything.
 * @param component The component type to create.
 * @param customiseConfiguration A method to override any configuration required with, will be given the `TestModuleData` as a parameter
 */
const canCreate = <T>(component: Type<T>, customiseConfiguration?: Function): void => {
  const fixture = configureTestBedFor(component, customiseConfiguration);
  fixture.detectChanges();
  expect(fixture.componentInstance).toBeTruthy();
};

export { configureTestBedFor as ConfigureTestBedFor, canCreate as CanCreateComponent };
