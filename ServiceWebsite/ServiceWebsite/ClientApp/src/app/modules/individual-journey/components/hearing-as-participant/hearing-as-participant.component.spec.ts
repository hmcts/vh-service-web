import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearingAsParticipantComponent } from './hearing-as-participant.component';
import { IndividualLocalisation } from '../../services/individual-localisation';

describe('HearingAsParticipantComponent', () => {
  let component: HearingAsParticipantComponent;
  let fixture: ComponentFixture<HearingAsParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearingAsParticipantComponent ],
      providers: [
        IndividualLocalisation
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingAsParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
