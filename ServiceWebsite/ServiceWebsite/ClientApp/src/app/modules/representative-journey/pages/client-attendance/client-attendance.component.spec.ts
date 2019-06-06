import { ClientAttendanceComponent } from './client-attendance.component';
import {
  CannotProceeedUntilChoiceIsSelected
} from '../../components/suitability-choice-page-base.component.spec';

describe('ClientAttendanceComponent for representative', () => {
  it('cannot proceed to next step until pressing choice, after submit value is bound', () => {
    const fixture = CannotProceeedUntilChoiceIsSelected(ClientAttendanceComponent);
    // and value is bound
    expect(fixture.component.model.clientAttendance).toBe(true);
  });
});
