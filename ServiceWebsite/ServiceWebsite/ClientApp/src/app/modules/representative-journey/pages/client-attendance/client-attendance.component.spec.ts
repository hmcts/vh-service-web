import { ClientAttendanceComponent } from './client-attendance.component';
import { CanCreateComponent } from '../representative-base-component/component-test-bed.spec';

describe('ClientAttendanceComponent', () => {
  it('can be created', () => {
    CanCreateComponent(ClientAttendanceComponent);
  });
});
