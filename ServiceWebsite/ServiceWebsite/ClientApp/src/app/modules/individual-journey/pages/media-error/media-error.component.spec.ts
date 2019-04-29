import { CanCreateComponent } from '../individual-base-component/component-test-bed.spec';
import { MediaErrorComponent } from './media-error.component';
import { ContactUsComponent } from 'src/app/modules/shared/contact-us/contact-us.component';
import { TestModuleMetadata } from '@angular/core/testing';

describe('MediaErrorComponent', () => {
  it('can be created', () => {
    CanCreateComponent(MediaErrorComponent,
      (config: TestModuleMetadata) => {
        config.declarations.push(ContactUsComponent);
      });
  });
});




