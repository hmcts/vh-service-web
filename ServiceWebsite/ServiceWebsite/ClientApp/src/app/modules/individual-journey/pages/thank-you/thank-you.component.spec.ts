import { CanCreateComponent } from '../individual-base-component/individual-component-test-bed.spec';
import { ThankYouComponent } from './thank-you.component';
import { ConfigureTestBedForPageComponent } from '../../components/suitability-choice-page-base.component.spec';
import { LongDatetimePipe } from 'src/app/modules/shared/date-time.pipe';
import { TestModuleMetadata } from '@angular/core/testing';

describe('ThankYouComponent', () => {
  it('can be created', () => {
    CanCreateComponent(ThankYouComponent,
      (configuration: TestModuleMetadata) => {
        configuration.declarations.push(LongDatetimePipe);
      });
  });
  it('should contain the scheduled date on init', () => {
    const fixture = ConfigureTestBedForPageComponent(ThankYouComponent,
      (configuration: TestModuleMetadata) => {
        configuration.declarations.push(LongDatetimePipe);
      }
    );
    expect(fixture.component.hearingDate).not.toBe(null);
  });
});
