import { UserCameraViewComponent } from './user-camera-view.component';
import { ElementRef } from '@angular/core';

const ne = { srcObject: '' };

class MockElementRef extends ElementRef {
  constructor() { super(ne); }
}

const component = new UserCameraViewComponent();

describe('UserCameraViewComponent', () => {
  it('should set media stream', () => {
    component.setSource(new MediaStream());
    expect(component.stream).toBeTruthy();
  });
  it('should set video source', () => {
    component.videoBox = new MockElementRef();
    component.setSource(new MediaStream());
    expect(component.videoBox.nativeElement.srcObject === '').toBeFalsy();
  });
});
