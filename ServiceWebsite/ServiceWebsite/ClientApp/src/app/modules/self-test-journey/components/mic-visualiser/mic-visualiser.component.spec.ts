import { MicVisualiserComponent } from '../mic-visualiser/mic-visualiser.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'webrtc-adapter';

describe('MicVisualiserComponent', () => {
  let component: MicVisualiserComponent;
  let fixture: ComponentFixture<MicVisualiserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MicVisualiserComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicVisualiserComponent);
    component = fixture.componentInstance;
  });

  it('should create component with stream provided', async () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function (stream) {
        component.stream = stream;
        fixture.detectChanges();
        expect(fixture.componentInstance).toBeTruthy();
      });
  });

  it('should throw an error if no stream', () => {
    try {
      fixture.detectChanges();
    } catch (e) {
      expect(e.message).toEqual('No stream provided');
    }
  });
});
