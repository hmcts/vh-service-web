import { CheckYourAnswersComponent } from './check-your-answers.component';
import {
  RepresentativeJourneyComponentTestBed,
  RepresentativeJourneyStubs
} from '../representative-base-component/representative-journey-component-test-bed.spec';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';
import { SuitabilityChoiceComponentFixture } from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';
import { BackNavigationStubComponent } from '../../../../testing/stubs/back-navigation-stub';
import { PresentingCaseDetails } from '../../representative-suitability.model';
import { RouterTestingModule } from '@angular/router/testing';
import { RepresentativeJourney } from '../../representative-journey';
import { Logger } from 'src/app/services/logger';
import { MockLogger } from 'src/app/testing/mocks/mock-logger';
import { fakeAsync } from '@angular/core/testing';

/* describe('CheckYourAnswersComponent', () => {
  it(`goes to ${RepresentativeJourneySteps} when pressing continue`, () => {
    const journey = RepresentativeJourneyStubs.journeySpy;
    journey.model.presentingCaseDetails = new PresentingCaseDetails();

    journey.model.presentingCaseDetails.email = 'TestUser@test.com';
    journey.model.presentingCaseDetails.fullName = 'Mr TestUser';
    journey.model.otherInformation.answer = true;
    journey.model.otherInformation.notes = 'Test Notes';
    const componentFixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: CheckYourAnswersComponent,
      declarations: [BackNavigationStubComponent],
      imports: [RouterTestingModule],
      journey: journey
    });

    const fixture = new SuitabilityChoiceComponentFixture(componentFixture);
    fixture.submitIsClicked();

    expect(journey.goto).toHaveBeenCalledWith(RepresentativeJourneySteps.AnswersSaved);
  });
}); */

describe('CheckYourAnswersComponent', () => {
  let fixture: SuitabilityChoiceComponentFixture;
  let journey: jasmine.SpyObj<RepresentativeJourney>;
  beforeEach(() => {
    journey = RepresentativeJourneyStubs.journeySpy;
    journey.model.presentingCaseDetails = new PresentingCaseDetails();
    journey.model.presentingCaseDetails.fullName = 'Mr TestUser';

    const componentFixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: CheckYourAnswersComponent,
      declarations: [
        BackNavigationStubComponent
      ],
      imports: [RouterTestingModule],
      providers: [{ provide: Logger, useClass: MockLogger }],
      journey: journey
    });
    fixture = new SuitabilityChoiceComponentFixture(componentFixture);
    fixture.detectChanges();
  });

  it(`goes to ${RepresentativeJourneySteps.AnswersSaved} when pressing continue`, fakeAsync(() => {
    fixture.submitIsClicked();
    expect(journey.submitQuestionnaire).toHaveBeenCalled();
    expect(journey.goto).toHaveBeenCalledWith(RepresentativeJourneySteps.AnswersSaved);
  }));
});
