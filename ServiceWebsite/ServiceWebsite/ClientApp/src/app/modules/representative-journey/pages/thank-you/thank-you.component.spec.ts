import { CanCreateComponent } from '../representative-base-component/component-test-bed.spec';
import { ThankYouComponent } from './thank-you.component';
import { LongDatetimePipe } from 'src/app/modules/shared/date-time.pipe';
import { TestModuleMetadata } from '@angular/core/testing';

describe('ThankYouComponent', () => {
  it('can be created', () => {
    CanCreateComponent(ThankYouComponent,
      (configuration: TestModuleMetadata) => {
        configuration.declarations.push(LongDatetimePipe);
      });
  });
});
