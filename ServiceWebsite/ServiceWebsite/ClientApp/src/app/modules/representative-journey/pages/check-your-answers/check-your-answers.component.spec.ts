import { CheckYourAnswersComponent } from './check-your-answers.component';
import { AppYesNoPipe } from '../../../shared/boolean.pipe';
import {
  RepresentativeJourneyComponentTestBed,
  RepresentativeJourneyStubs
} from '../representative-base-component/representative-journey-component-test-bed.spec';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';
import { SuitabilityChoiceComponentFixture } from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';
import { BackNavigationStubComponent } from '../../../../testing/stubs/back-navigation-stub';
import { PresentingCaseDetails } from '../../representative-suitability.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('CheckYourAnswersComponent', () => {
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
});
