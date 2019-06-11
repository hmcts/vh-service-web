import { YourComputerComponent } from './your-computer.component';
import {
  CannotProceeedUntilChoiceIsSelected,
  ConfigureTestBedForPageComponent
} from '../../components/suitability-choice-page-base.component.spec';
import { LongDatetimePipe } from 'src/app/modules/shared/date-time.pipe';
import { TestModuleMetadata } from '@angular/core/testing';

describe('YourComputerComponent', () => {
  it('cannot proceed to next step until pressing choice, after submit value is bound', () => {
    const fixture = CannotProceeedUntilChoiceIsSelected(YourComputerComponent);
    // and value is bound
    expect(fixture.componentInstance.model.computer).toBe(true);
  });
  it('should contain the scheduled date on init', () => {
    const fixture = ConfigureTestBedForPageComponent(YourComputerComponent,
      (configuration: TestModuleMetadata) => {
        configuration.declarations.push(LongDatetimePipe);
      }
    );
    expect(fixture.component.hearingDate).not.toBe(null);
  });
});
