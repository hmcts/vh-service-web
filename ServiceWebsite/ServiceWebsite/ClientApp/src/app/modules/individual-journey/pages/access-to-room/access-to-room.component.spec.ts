import { AccessToRoomComponent } from './access-to-room.component';
import { IndividualJourneyComponentTestBed, IndividualJourneyStubs } from '../individual-base-component/individual-component-test-bed.spec';
import { ComponentFixture } from '@angular/core/testing';
import { CommonTests } from 'src/app/modules/base-journey/components/common-tests.spec';
import { IndividualJourneySteps } from '../../individual-journey-steps';
import { IndividualJourney } from '../../individual-journey';
import { BackNavigationStubComponent } from '../../../../testing/stubs/back-navigation-stub';
import { BackNavigationComponent } from '../../../shared/back-navigation/back-navigation.component';

describe('AccessToRoomComponent', () => {
  let fixture: ComponentFixture<AccessToRoomComponent>;
  let journey: IndividualJourney;

  beforeEach(() => {
    journey = IndividualJourneyStubs.journeySpy;
    fixture = IndividualJourneyComponentTestBed.createComponent({
      component: AccessToRoomComponent,
      declarations: [BackNavigationStubComponent],
      journey: journey
    });
  });

  it(`cannot proceed to next step until pressing choice, then goes to ${IndividualJourneySteps.Consent}`, () => {
    CommonTests.cannotProceedUntilChoiceIsSelected(fixture);

    // and value is bound
    expect(fixture.componentInstance.model.room).toBe(true);
    expect(journey.goto).toHaveBeenCalledWith(IndividualJourneySteps.Consent);
  });

  it('should contain the scheduled date on init', () => {
    expect(fixture.componentInstance.hearingDate).not.toBe(null);
  });
});

