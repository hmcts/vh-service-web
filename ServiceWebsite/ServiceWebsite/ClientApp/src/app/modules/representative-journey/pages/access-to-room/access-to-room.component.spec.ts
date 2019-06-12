import { AccessToRoomComponent } from './access-to-room.component';
import {
  CannotProceeedUntilChoiceIsSelected
} from '../../components/suitability-choice-page-base.component.spec';

describe('AccessToRoomComponent for representative', () => {
  it('cannot proceed to next step until pressing choice, after submit value is bound', () => {
    const fixture = CannotProceeedUntilChoiceIsSelected(AccessToRoomComponent);
    // and value is bound
    expect(fixture.componentInstance.model.room).toBe(true);
  });
});


