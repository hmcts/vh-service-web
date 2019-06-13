import { AccessToRoomComponent } from './access-to-room.component';
import { IndividualJourneyComponentTestBed } from '../individual-base-component/individual-component-test-bed.spec';
import { ComponentFixture } from '@angular/core/testing';
import { CommonTests } from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';

describe('AccessToRoomComponent', () => {
  let fixture: ComponentFixture<AccessToRoomComponent>;

  beforeEach(() => {
    fixture = IndividualJourneyComponentTestBed.createComponent({component: AccessToRoomComponent});
  });

  it('cannot proceed to next step until pressing choice, after submit value is bound', () => {
    CommonTests.cannotProceedUntilChoiceIsSelected(fixture);

    // and value is bound
    expect(fixture.componentInstance.model.room).toBe(true);
  });

  it('should contain the scheduled date on init', () => {
    expect(fixture.componentInstance.hearingDate).not.toBe(null);
  });
});

