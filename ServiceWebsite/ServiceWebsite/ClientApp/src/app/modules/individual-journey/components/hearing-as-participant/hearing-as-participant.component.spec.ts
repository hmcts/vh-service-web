import { HearingAsParticipantComponent } from './hearing-as-participant.component';
import { ComponentFixture } from '@angular/core/testing';

import configureTestBedFor from '../individual-base-component/component-test-bed';

describe('HearingAsParticipantComponent', () => {
  let component: HearingAsParticipantComponent;
  let fixture: ComponentFixture<HearingAsParticipantComponent>;

  beforeEach(() => {
    fixture = configureTestBedFor(HearingAsParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
