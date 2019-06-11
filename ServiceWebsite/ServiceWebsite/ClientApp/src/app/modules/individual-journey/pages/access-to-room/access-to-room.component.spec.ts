import { CannotProceeedUntilChoiceIsSelected } from '../../components/suitability-choice-page-base.component.spec';
import { AccessToRoomComponent } from './access-to-room.component';
import { IndividualJourneyComponentTestBed } from '../individual-base-component/individual-component-test-bed.spec';

describe('AccessToRoomComponent', () => {
  it('cannot proceed to next step until pressing choice, after submit value is bound', () => {
    const fixture = CannotProceeedUntilChoiceIsSelected(AccessToRoomComponent);
    // and value is bound
    expect(fixture.componentInstance.model.room).toBe(true);
  });

  it('should contain the scheduled date on init', () => {
    const fixture = IndividualJourneyComponentTestBed.createComponent({component: AccessToRoomComponent});
    expect(fixture.componentInstance.hearingDate).not.toBe(null);
  });
});

