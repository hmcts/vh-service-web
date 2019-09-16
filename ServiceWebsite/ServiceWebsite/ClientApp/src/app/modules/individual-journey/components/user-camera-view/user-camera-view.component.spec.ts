import { UserCameraViewComponent } from './user-camera-view.component';
import { ElementRef } from '@angular/core';

class MockElementRef extends ElementRef {
  constructor() { super({ srcObject: '' }); }
}

const component = new UserCameraViewComponent();

describe('UserCameraViewComponent', () => {
  it('should set video source to the native element', () => {
    component.videoBox = new MockElementRef();
    component.setSource(new MediaStream());
    expect(component.videoBox.nativeElement.srcObject === '').toBeFalsy();
  });
  it('should stop media stream and reset media source to null or empty', () => {
    component.videoBox = new MockElementRef();
    component.setSource(new MediaStream());
    component.ngOnDestroy();
    expect(component.videoBox.nativeElement.srcObject).toBeFalsy();
  });
});
