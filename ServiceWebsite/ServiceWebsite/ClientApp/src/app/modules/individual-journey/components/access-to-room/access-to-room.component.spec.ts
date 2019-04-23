import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessToRoomComponent } from './access-to-room.component';
import { IndividualLocalisation } from '../../services/individual-localisation';

describe('AccessToRoomComponent', () => {
  let component: AccessToRoomComponent;
  let fixture: ComponentFixture<AccessToRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessToRoomComponent ],
      providers: [
        IndividualLocalisation
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessToRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
