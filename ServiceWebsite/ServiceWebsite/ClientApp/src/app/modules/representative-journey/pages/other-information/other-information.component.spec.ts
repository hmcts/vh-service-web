import { OtherInformationComponent } from './other-information.component';
import {
  RepresentativeJourneyComponentTestBed,
  RepresentativeJourneyStubs
} from '../representative-base-component/representative-journey-component-test-bed.spec';
import { CommonTests } from 'src/app/modules/base-journey/components/common-tests.spec';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';
import { fakeAsync, tick } from '@angular/core/testing';
import { SuitabilityChoiceComponentFixture } from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';
import { RepresentativeJourney } from '../../representative-journey';
import { ChoiceTextboxComponent } from 'src/app/modules/base-journey/components/choice-textbox.component';
import { BackNavigationStubComponent } from '../../../../testing/stubs/back-navigation-stub';

describe('OtherInformationComponent', () => {
  let fixture: SuitabilityChoiceComponentFixture;
  let component: OtherInformationComponent;
  let journey: jasmine.SpyObj<RepresentativeJourney>;
  beforeEach(() => {
    journey = RepresentativeJourneyStubs.journeySpy;
    const componentFixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: OtherInformationComponent,
      declarations: [
        ChoiceTextboxComponent,
        BackNavigationStubComponent
      ],
      journey: journey
    });
    component = componentFixture.componentInstance;
    fixture = new SuitabilityChoiceComponentFixture(componentFixture);
    fixture.detectChanges();
  });

  it(`should submit questionnaire and go to ${RepresentativeJourneySteps.AnswersSaved} after having selected an option`, fakeAsync(() => {
    fixture.radioBoxIsClicked('#choice-no');
    fixture.submitIsClicked();
    tick();

    expect(journey.model.otherInformation.answer).toBe(false);
    expect(journey.submitQuestionnaire).toHaveBeenCalled();
    expect(journey.goto).toHaveBeenCalledWith(RepresentativeJourneySteps.AnswersSaved);
   }));
});
