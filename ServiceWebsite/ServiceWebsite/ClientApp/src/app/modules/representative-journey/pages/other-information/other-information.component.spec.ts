import { OtherInformationComponent } from './other-information.component';
import {
  RepresentativeJourneyComponentTestBed,
  RepresentativeJourneyStubs
} from '../representative-base-component/representative-journey-component-test-bed.spec';
import { CommonTests } from 'src/app/modules/base-journey/components/common-tests.spec';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';
import { fakeAsync, tick } from '@angular/core/testing';

describe('OtherInformationComponent for representative', () => {
  it(`'should only proceed to next step, ${RepresentativeJourneySteps.AnswersSaved}, after having selected an option'`, () => {
    const journey = RepresentativeJourneyStubs.journeySpy;
    const fixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: OtherInformationComponent,
      journey: journey
    });

    CommonTests.cannotProceedUntilChoiceIsSelected(fixture);

  });

});
