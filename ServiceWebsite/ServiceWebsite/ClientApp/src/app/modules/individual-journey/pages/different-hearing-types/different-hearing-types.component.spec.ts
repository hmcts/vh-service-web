import { CanCreateComponent } from '../individual-base-component/component-test-bed.spec';
import { DifferentHearingTypesComponent } from './different-hearing-types.component';
import { TestModuleMetadata } from '@angular/core/testing';
import {ContactUsComponent} from '../../../shared/contact-us/contact-us.component';

describe('DifferentHearingTypesComponent', () => {
  it('can be created', () => {
    CanCreateComponent(DifferentHearingTypesComponent, (config: TestModuleMetadata) => {
       config.declarations.push([ContactUsComponent]);
    });
  });
});
