import { MediaDeviceTestData } from '../data/media-device-test-data';
import { UserMediaDevice } from '../../modules/shared/models/user-media-device';
import { SessionStorage } from '../../modules/shared/services/session-storage';
import { UserMediaService } from '../../services/user-media.service';
import { MediaAccessResponse } from 'src/app/modules/base-journey/participant-suitability.model';

export class MockUserMediaService extends UserMediaService {

  private testData = new MediaDeviceTestData();
  mediaAccessResponse: MediaAccessResponse;

  async requestAccess(): Promise<MediaAccessResponse> {
    this.mediaAccessResponse = new MediaAccessResponse();
    this.mediaAccessResponse.result = true;
    this.mediaAccessResponse.exceptionType = '';
    return this.mediaAccessResponse;
  }

  async getListOfVideoDevices(): Promise<UserMediaDevice[]> {
    return this.testData.getListOfCameras();
  }

  async getListOfMicrophoneDevices(): Promise<UserMediaDevice[]> {
    return this.testData.getListOfMicrophones();
  }

  getCachedDeviceIfStillConnected(cache: SessionStorage<UserMediaDevice>): UserMediaDevice {
    return null;
  }

  checkDeviceListIsReady(): Promise<void> {
    return undefined;
  }


  getPreferredCamera(): UserMediaDevice {
    return undefined;
  }

  getPreferredMicrophone(): UserMediaDevice {
    return undefined;
  }

  getStream(): Promise<MediaStream> {
    return undefined;
  }

  hasMultipleDevices(): Promise<boolean> {
    return undefined;
  }

  stopStream(): void {
  }

  updateAvailableDevicesList(): Promise<void> {
    return undefined;
  }

  updatePreferredCamera(camera: UserMediaDevice): void {
  }

  updatePreferredMicrophone(microphone: UserMediaDevice): void {
  }
}
