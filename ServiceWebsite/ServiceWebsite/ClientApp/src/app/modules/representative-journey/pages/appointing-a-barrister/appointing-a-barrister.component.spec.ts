import { RepresentativeJourneySteps } from './../../representative-journey-steps';
import { AppointingABarristerComponent } from './appointing-a-barrister.component';
import {
  RepresentativeJourneyStubs,
  RepresentativeJourneyComponentTestBed
} from '../representative-base-component/representative-journey-component-test-bed.spec';
import { SuitabilityChoiceComponentFixture } from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';

describe('AppointingABarristerComponent', () => {
  it(`should go to ${RepresentativeJourneySteps.OtherInformation} on continuing`, () => {
    const journey = RepresentativeJourneyStubs.journeySpy;
    const componentFixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: AppointingABarristerComponent,
      journey: journey
    });

    const fixture = new SuitabilityChoiceComponentFixture(componentFixture);
    fixture.radioBoxIsClicked('#i-am-barrister');

    fixture.submitIsClicked();
  });
});
