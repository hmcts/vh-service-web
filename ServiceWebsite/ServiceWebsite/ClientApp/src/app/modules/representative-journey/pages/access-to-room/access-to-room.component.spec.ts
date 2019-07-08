import { RepresentativeJourneySteps } from './../../representative-journey-steps';
import { CommonTests } from './../../../base-journey/components/common-tests.spec';
import { AccessToRoomComponent } from './access-to-room.component';
import {
  RepresentativeJourneyComponentTestBed,
  RepresentativeJourneyStubs
} from '../representative-base-component/representative-journey-component-test-bed.spec';

describe('AccessToRoomComponent for representative', () => {
  it(`should proceed to ${RepresentativeJourneySteps.AboutYourClient} and bind value after pressing a choice`, () => {
    const journey = RepresentativeJourneyStubs.journeySpy;
    const fixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: AccessToRoomComponent,
      journey: journey
    });

    CommonTests.cannotProceedUntilChoiceIsSelected(fixture);

    // and value is bound
    expect(fixture.componentInstance.model.room).toBe(true);
    expect(journey.goto).toHaveBeenCalledWith(RepresentativeJourneySteps.AboutYourClient);
  });
});


