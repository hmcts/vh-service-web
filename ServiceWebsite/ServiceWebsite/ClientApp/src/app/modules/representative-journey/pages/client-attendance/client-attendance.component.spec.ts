import { CommonTests } from './../../../base-journey/components/common-tests.spec';
import { ClientAttendanceComponent } from './client-attendance.component';
import {
  RepresentativeJourneyComponentTestBed,
  RepresentativeJourneyStubs
} from '../representative-base-component/representative-journey-component-test-bed.spec';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';

describe('ClientAttendanceComponent for representative', () => {
  it(`can submit only after selecting a value and then goes to ${RepresentativeJourneySteps.HearingSuitability}`, () => {
    const journey = RepresentativeJourneyStubs.journeySpy;
    const fixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: ClientAttendanceComponent,
      journey: journey
    });

    CommonTests.cannotProceedUntilChoiceIsSelected(fixture);

    // and value is bound
    expect(fixture.componentInstance.model.clientAttendance).toBe(true);
    expect(journey.goto).toHaveBeenCalledWith(RepresentativeJourneySteps.HearingSuitability);
  });
});
