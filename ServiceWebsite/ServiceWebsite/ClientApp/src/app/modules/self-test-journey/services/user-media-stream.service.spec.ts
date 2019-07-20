import { UserMediaStreamService } from './user-media-stream.service';
import { MockLogger } from '../../../testing/mocks/mock-logger';

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
  it('should return default video stream', async () => {
    const videoStream = await service.getStreamForCam(null);
    expect(videoStream).toBeTruthy();
    expect(videoStream.getTracks().length).toBeGreaterThan(0);
  });
  it('should stop media stream', async () => {
    const videoStream = await service.getStreamForCam(null);
    service.stopStream(videoStream);
    expect(videoStream.getTracks()[0].readyState).toBe('ended');
  });
  it('should give access to camera and microphone', async () => {
    const access = await service.requestAccess();
    expect(access).toBeTruthy();
  });
});
