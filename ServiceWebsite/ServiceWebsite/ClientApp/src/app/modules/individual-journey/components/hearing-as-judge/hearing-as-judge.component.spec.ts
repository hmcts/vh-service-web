import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearingAsJudgeComponent } from './hearing-as-judge.component';
import { IndividualLocalisation } from '../../services/individual-localisation';

describe('HearingAsJudgeComponent', () => {
  let component: HearingAsJudgeComponent;
  let fixture: ComponentFixture<HearingAsJudgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearingAsJudgeComponent ],
      providers: [
        IndividualLocalisation
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingAsJudgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
