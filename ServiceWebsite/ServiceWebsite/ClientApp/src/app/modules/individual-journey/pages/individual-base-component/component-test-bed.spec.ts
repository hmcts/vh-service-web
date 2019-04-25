import { CommonModule } from '@angular/common';
import { TestBed, ComponentFixture, TestModuleMetadata } from '@angular/core/testing';
import { Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LocalisePipe } from '../../pipes/localise.pipe';
import { IndividualLocalisation } from '../../services/individual-localisation';
import { Localisation } from 'src/app/modules/shared/localisation';
import { IndividualJourney } from '../../individual-journey';
import { IndividualSuitabilityModel, SuitabilityAnswer } from '../../individual-suitability.model';

/**
 * Helper to configure the testbed for any derivatives of the view base component.
 * @param component The type of component to prepare test bed for
 * @param customiseConfiguration A method to override any configuration required with, will be given the `TestModuleData` as a parameter
 */
const configureTestBedFor = <T>(component: Type<T>, customiseConfiguration?: Function): ComponentFixture<T> => {
    const config: TestModuleMetadata = {
        declarations: [ component, LocalisePipe ],
        imports: [ CommonModule, ReactiveFormsModule ],
        providers: [
            { provide: Localisation, useClass: IndividualLocalisation },
            { provide: IndividualJourney, useValue: new IndividualJourney() },
            LocalisePipe
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
