import { ComponentFixture } from '@angular/core/testing';

import { ConfigureTestBedFor } from '../individual-base-component/component-test-bed';
import { AccessToRoomComponent } from './access-to-room.component';

describe('AccessToRoomComponent', () => {
  let component: AccessToRoomComponent;
  let fixture: ComponentFixture<AccessToRoomComponent>;

  beforeEach(() => {
    fixture = ConfigureTestBedFor(AccessToRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
