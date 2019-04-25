import { UserCameraViewComponent } from './user-camera-view.component';

const component = new UserCameraViewComponent();
describe('UserCameraViewComponent', () => {
  it('should set media stream', () => {
    component.setSource(new MediaStream());
    expect(component.stream).toBeTruthy();
  });
});
