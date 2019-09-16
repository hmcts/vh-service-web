import { UserCameraViewComponent } from './user-camera-view.component';
import { ElementRef } from '@angular/core';

class MockElementRef extends ElementRef {
  constructor() { super({ srcObject: '' }); }
  nativeElement: {
    srcObject: 'source',
    src: 'source'
  };
}

const component = new UserCameraViewComponent();

describe('UserCameraViewComponent', () => {
  it('should set video source to the native element', () => {
    component.videoBox = new MockElementRef();
    component.setSource(new MediaStream());
    expect(component.videoBox.nativeElement.srcObject === '').toBeFalsy();
  });
  it('should stop media stream and reset media srcObject to null', () => {
    component.videoBox = new MockElementRef();
    component.setSource(new MediaStream());
    component.ngOnDestroy();
    expect(component.videoBox.nativeElement.srcObject).toBeFalsy();
  });
  it('should reset media src to null', () => {
    component.videoBox = new MockElementRef();
    component.videoBox.nativeElement.srcObject = null;
    component.setSource(new MediaStream());
    component.ngOnDestroy();
    expect(component.videoBox.nativeElement.src).toBeFalsy();
  });
});
