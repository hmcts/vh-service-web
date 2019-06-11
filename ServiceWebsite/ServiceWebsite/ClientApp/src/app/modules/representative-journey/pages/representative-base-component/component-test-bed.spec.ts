import { MutableRepresentativeSuitabilityModel } from './../../mutable-representative-suitability.model';
import { ComponentFixture, TestModuleMetadata } from '@angular/core/testing';
import { Type, Component } from '@angular/core';

import { RepresentativeJourney } from '../../representative-journey';
import { RepresentativeSuitabilityModel } from '../../representative-suitability.model';
import { Hearing } from '../../../base-journey/participant-suitability.model';
import { RepresentativeStepsOrderFactory } from '../../representative-steps-order.factory';
import { ComponentTestBedConfiguration, JourneyComponentTestBed } from 'src/app/modules/base-journey/components/journey-component-test-bed';

@Component({ selector: 'app-hearing-details-header', template: ''})
export class StubHearingDetailsHeaderComponent {}

export interface RepresentativeComponentTestBedConfiguration<TComponent> extends ComponentTestBedConfiguration<TComponent> {
  journey?: RepresentativeJourney;
}

export class RepresentativeJourneyStubs {
  public static get default(): RepresentativeJourney {
      // Journey with initialised model, so that it is accessible in steeps
    const representativeStepsOrderFactory = new RepresentativeStepsOrderFactory();
    const journey = new RepresentativeJourney(representativeStepsOrderFactory);
    const journeyModel = new MutableRepresentativeSuitabilityModel();

    journeyModel.hearing = new Hearing('hearingId', new Date(2099, 1, 1, 12, 0));
    journey.forSuitabilityAnswers([journeyModel]);
    return journey;
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

  return RepresentativeJourneyComponentTestBed.createComponent({
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
