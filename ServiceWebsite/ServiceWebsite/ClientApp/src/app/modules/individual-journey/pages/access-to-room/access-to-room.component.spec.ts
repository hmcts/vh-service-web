import {
  CannotProceeedUntilChoiceIsSelected,
  ConfigureTestBedForPageComponent
} from '../../components/suitability-choice-page-base.component.spec';
import { LongDatetimePipe } from 'src/app/modules/shared/date-time.pipe';
import { TestModuleMetadata } from '@angular/core/testing';
import { AccessToRoomComponent } from './access-to-room.component';

describe('AccessToRoomComponent', () => {
  it('cannot proceed to next step until pressing choice, after submit value is bound', () => {
    const fixture = CannotProceeedUntilChoiceIsSelected(AccessToRoomComponent);
    // and value is bound
    expect(fixture.component.model.room).toBe(true);
  });
  it('should contain the scheduled date on init', () => {
    const fixture = ConfigureTestBedForPageComponent(AccessToRoomComponent,
      (configuration: TestModuleMetadata) => {
        configuration.declarations.push(LongDatetimePipe);
      }
    );
    expect(fixture.component.hearingDate).not.toBe(null);
  });
});

