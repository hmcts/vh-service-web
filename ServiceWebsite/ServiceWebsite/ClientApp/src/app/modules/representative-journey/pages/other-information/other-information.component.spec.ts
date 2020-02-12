import { OtherInformationComponent } from './other-information.component';
import {
  RepresentativeJourneyComponentTestBed,
  RepresentativeJourneyStubs
} from '../representative-base-component/representative-journey-component-test-bed.spec';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';
import { fakeAsync, tick } from '@angular/core/testing';
import { SuitabilityChoiceComponentFixture } from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';
import { RepresentativeJourney } from '../../representative-journey';
import { ChoiceTextboxComponent } from 'src/app/modules/base-journey/components/choice-textbox.component';
import { BackNavigationStubComponent } from '../../../../testing/stubs/back-navigation-stub';
import {MockLogger} from '../../../../testing/mocks/mock-logger';
import {Logger} from '../../../../services/logger';

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
      providers: [{provide: Logger, useClass: MockLogger}],
      journey: journey
    });
    component = componentFixture.componentInstance;
    fixture = new SuitabilityChoiceComponentFixture(componentFixture);
    fixture.detectChanges();
  });

  it(`should go to ${RepresentativeJourneySteps.CheckYourAnswers} on continuing`, fakeAsync(() => {
    // fixture.radioBoxIsClicked('#choice-no');
    //fixture.submitIsClicked();

    //  expect(journey.model.otherInformation.answer).toBe(false);
    // expect(journey.goto).toHaveBeenCalledWith(RepresentativeJourneySteps.CheckYourAnswers);

    fixture.radioBoxIsClicked('#choice-no');
    fixture.submitIsClicked();
    expect(journey.model.otherInformation.answer).toBe(false);
    expect(journey.goto).toHaveBeenCalledWith(RepresentativeJourneySteps.CheckYourAnswers);
  }));
   
});
