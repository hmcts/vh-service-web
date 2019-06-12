import { CommonTests } from './../../../base-journey/components/suitability-choice-component-fixture.spec';
import { AccessToRoomComponent } from './access-to-room.component';
import { RepresentativeJourneyComponentTestBed } from '../representative-base-component/representative-journey-component-test-bed.spec';

describe('AccessToRoomComponent for representative', () => {
  it('cannot proceed to next step until pressing choice, after submit value is bound', () => {
    const fixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: AccessToRoomComponent
    });

    CommonTests.cannotProceedUntilChoiceIsSelected(fixture);

    // and value is bound
    expect(fixture.componentInstance.model.room).toBe(true);
  });
});


