import { CommonTests } from './../../../base-journey/components/suitability-choice-component-fixture.spec';
import { ClientAttendanceComponent } from './client-attendance.component';
import { RepresentativeJourneyComponentTestBed } from '../representative-base-component/component-test-bed.spec';

describe('ClientAttendanceComponent for representative', () => {
  it('cannot proceed to next step until pressing choice, after submit value is bound', () => {
    const fixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: ClientAttendanceComponent
    });

    CommonTests.cannotProceedUntilChoiceIsSelected(fixture);

    // and value is bound
    expect(fixture.componentInstance.model.clientAttendance).toBe(true);
  });
});
