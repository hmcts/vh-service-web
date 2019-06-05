import { MutableRepresentativeSuitabilityModel } from './../../mutable-representative-suitability.model';
import { CommonModule } from '@angular/common';
import { TestBed, ComponentFixture, TestModuleMetadata } from '@angular/core/testing';
import { Type, Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { Localisation } from 'src/app/modules/shared/localisation';
import { RepresentativeJourney } from '../../representative-journey';
import { RepresentativeSuitabilityModel } from '../../representative-suitability.model';
import { Hearing } from '../../../base-journey/participant-suitability.model';
import { RepresentativeStepsOrderFactory } from '../../representative-steps-order.factory';


@Component({ selector: 'app-contact-us', template: '' })
export class StubContactUsComponent { }

@Component({ selector: 'app-show-details', template: '' })
export class StubShowDetailsComponent {
  @Input()
  detailsTitle: string;

  @Input()
  textArray: Array<string> = [];
}

@Component({ selector: 'app-hearing-details-header', template: ''})
export class StubHearingDetailsHeaderComponent {}

/**
 * Helper to configure the testbed for any derivatives of the view base component.
 * @param component The type of component to prepare test bed for
 * @param customiseConfiguration A method to override any configuration required with, will be given the `TestModuleData` as a parameter
 */
const configureTestBedFor = <T>(component: Type<T>, customiseConfiguration?: Function): ComponentFixture<T> => {
  // Journey with initialised model, so that it is accessible in steeps
  const representativeStepsOrderFactory = new RepresentativeStepsOrderFactory();
  const journey = new RepresentativeJourney(representativeStepsOrderFactory);
  const journeyModel = new MutableRepresentativeSuitabilityModel();

  journeyModel.hearing = new Hearing('hearingId', new Date(2099, 1, 1, 12, 0));
  journey.forSuitabilityAnswers([journeyModel]);

  const config: TestModuleMetadata = {
    declarations: [component, StubContactUsComponent, StubShowDetailsComponent, StubHearingDetailsHeaderComponent],
    imports: [CommonModule, ReactiveFormsModule],
    providers: [
      { provide: RepresentativeSuitabilityModel, useClass: MutableRepresentativeSuitabilityModel },
      { provide: RepresentativeJourney, useValue: journey },
    ]
  };
  if (customiseConfiguration) {
    customiseConfiguration(config);
  }
  TestBed.configureTestingModule(config).compileComponents();
  return TestBed.createComponent(component);
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
