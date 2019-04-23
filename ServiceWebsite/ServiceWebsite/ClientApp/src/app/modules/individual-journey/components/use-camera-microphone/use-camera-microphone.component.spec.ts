import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseCameraMicrophoneComponent } from './use-camera-microphone.component';
import { IndividualLocalisation } from '../../services/individual-localisation';

describe('UseCameraMicrophoneComponent', () => {
  let component: UseCameraMicrophoneComponent;
  let fixture: ComponentFixture<UseCameraMicrophoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseCameraMicrophoneComponent ],
      providers: [
        IndividualLocalisation
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseCameraMicrophoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
