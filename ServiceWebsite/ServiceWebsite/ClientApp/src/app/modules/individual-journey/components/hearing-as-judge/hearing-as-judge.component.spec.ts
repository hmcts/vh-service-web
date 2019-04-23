import { HearingAsJudgeComponent } from './hearing-as-judge.component';
import { ComponentFixture } from '@angular/core/testing';

import configureTestBedFor from '../individual-base-component/component-test-bed';

describe('HearingAsJudgeComponent', () => {
  let component: HearingAsJudgeComponent;
  let fixture: ComponentFixture<HearingAsJudgeComponent>;

  beforeEach(() => {
    fixture = configureTestBedFor(HearingAsJudgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
