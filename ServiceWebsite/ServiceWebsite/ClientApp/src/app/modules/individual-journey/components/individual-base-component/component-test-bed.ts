import { TestBed, ComponentFixture, TestModuleMetadata } from '@angular/core/testing';
import { Type } from '@angular/core';

import { LocalisePipe } from '../../pipes/localise.pipe';
import { IndividualLocalisation } from '../../services/individual-localisation';
import { Localisation } from 'src/app/modules/shared/localisation';

/**
 * Helper to configure the testbed for any derivatives of the view base component.
 * @param component The type of component to prepare test bed for
 * @param customizeConfiguration A method to override any configuration required with, will be given the `TestModuleData` as a parameter
 */
const configureTestBedFor = <T>(component: Type<T>, customizeConfiguration?: Function): ComponentFixture<T> => {
    const config: TestModuleMetadata = {
        declarations: [ component, LocalisePipe ],
        providers: [
            { provide: Localisation, useClass: IndividualLocalisation },
            LocalisePipe
        ]
    };
    if (customizeConfiguration) {
        customizeConfiguration(config);
    }
    TestBed.configureTestingModule(config).compileComponents();
    return TestBed.createComponent(component);
};

/**
 * Helper method to quickly test if the component can be created, setting up a test bed and everything.
 * @param component The component type to create.
 */
const canCreate = <T>(component: Type<T>): void => {
    const fixture = configureTestBedFor(component);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
}

export { configureTestBedFor as ConfigureTestBedFor, canCreate as CanCreateComponent };
