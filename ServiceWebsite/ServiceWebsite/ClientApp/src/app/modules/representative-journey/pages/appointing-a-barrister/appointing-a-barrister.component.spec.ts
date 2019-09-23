import { RepresentativeJourneySteps } from './../../representative-journey-steps';
import { CommonTests } from 'src/app/modules/base-journey/components/common-tests.spec';
import { AppointingABarristerComponent } from './appointing-a-barrister.component';
import {
  RepresentativeJourneyStubs,
  RepresentativeJourneyComponentTestBed
} from '../representative-base-component/representative-journey-component-test-bed.spec';

describe('AppointingABarristerComponent', () => {
  it(`should go to ${RepresentativeJourneySteps.OtherInformation} and have submitted after having selected an option`, async () => {
    const journey = RepresentativeJourneyStubs.journeySpy;
    const fixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: AppointingABarristerComponent,
      journey: journey
    });

    // CommonTests.cannotProceedUntilChoiceIsSelected(fixture);

    // need to await async submit
    await fixture.whenStable();

  });
});
