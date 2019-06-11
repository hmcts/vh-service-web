import { Type, Input, Component } from '@angular/core';
import { TestModuleMetadata, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({ selector: 'app-contact-us', template: '' })
export class StubContactUsComponent { }

@Component({ selector: 'app-show-details', template: '' })
export class StubShowDetailsComponent {
  @Input()
  detailsTitle: string;

  @Input()
  textArray: Array<string> = [];
}

/**
 * Used to configure the test bed, follows the same interface as the `TestModuleMetadata`
 */
export interface ComponentTestBedConfiguration<TComponent> {
    component: Type<TComponent>;
    providers?: any[];
    declarations?: any[];
    imports?: any[];
}

/**
 * Configure the test bed for a journey component
 */
export class JourneyComponentTestBed {
    createComponent<TComponent>(config: ComponentTestBedConfiguration<TComponent>): ComponentFixture<TComponent> {
      const metadata: TestModuleMetadata = {
        declarations: [
          config.component,
          StubContactUsComponent,
          StubShowDetailsComponent,
          ...(config.declarations || [])
        ],
        providers: config.providers || [],
        imports: [
          CommonModule,
          ReactiveFormsModule,
          ...(config.imports || [])
        ]
      };

      TestBed.configureTestingModule(metadata).compileComponents();
      return TestBed.createComponent(config.component);
    }
  }
