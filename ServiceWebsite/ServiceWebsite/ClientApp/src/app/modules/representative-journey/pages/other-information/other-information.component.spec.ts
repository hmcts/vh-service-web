import { OtherInformationComponent } from './other-information.component';
import {
  RepresentativeJourneyComponentTestBed,
  RepresentativeJourneyStubs
} from '../representative-base-component/representative-journey-component-test-bed.spec';
import { CommonTests } from 'src/app/modules/base-journey/components/common-tests.spec';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';
import { fakeAsync, tick } from '@angular/core/testing';

describe('OtherInformationComponent for representative', () => {
  it(`should submit questionnaire and go to ${RepresentativeJourneySteps.AnswersSaved} after having selected an option`,
    fakeAsync(() => {
      const journey = RepresentativeJourneyStubs.journeySpy;
      const component = new OtherInformationComponent(journey);

      component.ngOnInit();
      component.choice.setValue(false);

      component.submit();
      tick();

      expect(journey.submitQuestionnaire).toHaveBeenCalled();
      expect(journey.goto).toHaveBeenCalledWith(RepresentativeJourneySteps.AnswersSaved);
    }));
});
