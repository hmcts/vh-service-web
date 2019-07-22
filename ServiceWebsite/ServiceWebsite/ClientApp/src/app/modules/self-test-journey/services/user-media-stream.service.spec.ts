import { UserMediaStreamService } from './user-media-stream.service';
import { MockLogger } from '../../../testing/mocks/mock-logger';
import { UserMediaDevice } from '../models/user-media-device';

describe('UserMediaStreamService', () => {
  let service: UserMediaStreamService;

  service = new UserMediaStreamService(new MockLogger());

  it('should be created', async () => {
    expect(service).toBeTruthy();
  });

  it('should return default audio stream', async () => {
    const audioStream = await service.getStreamForMic(null);
    expect(audioStream).toBeTruthy();
    expect(audioStream.getTracks().length).toBeGreaterThan(0);
  });
  it('should return no stream for invalid microphone device', async () => {
    const audioStream = await service.getStreamForMic(new UserMediaDevice('label', '123', 'audioinput', ''));
    expect(audioStream).toBeFalsy();
  });

  it('should return default video stream', async () => {
    const videoStream = await service.getStreamForCam(null);
    expect(videoStream).toBeTruthy();
    expect(videoStream.getTracks().length).toBeGreaterThan(0);
  });
  it('should return no stream for invalid camera device', async () => {
    const videoStream = await service.getStreamForCam(new UserMediaDevice('label', '123', 'videoinput', ''));
    expect(videoStream).toBeFalsy();
  });
  it('should stop media stream', async () => {
    const videoStream = await service.getStreamForCam(null);
    service.stopStream(videoStream);
    expect(videoStream.getTracks()[0].readyState).toBe('ended');
  });
  it('should expect error if stream is null', async () => {
    service.stopStream(null);
  });
  it('should give access to camera and microphone', async () => {
    const access = await service.requestAccess();
    expect(access).toBeTruthy();
  });
});
