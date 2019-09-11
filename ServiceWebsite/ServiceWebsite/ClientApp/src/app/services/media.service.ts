import {SessionStorage} from '../modules/shared/services/session-storage';
import {UserMediaDevice} from '../modules/shared/models/user-media-device';

export abstract class MediaService {
  abstract getListOfVideoDevices(): Promise<UserMediaDevice[]>;
  abstract getListOfMicrophoneDevices(): Promise<UserMediaDevice[]>;
  abstract checkDeviceListIsReady(): Promise<void>;
  abstract updateAvailableDevicesList(): Promise<void>;
  abstract hasMultipleDevices(): Promise<boolean>;
  abstract getPreferredCamera(): UserMediaDevice;
  abstract getPreferredMicrophone(): UserMediaDevice;
  abstract getCachedDeviceIfStillConnected(cache: SessionStorage<UserMediaDevice>): UserMediaDevice;
  abstract updatePreferredCamera(camera: UserMediaDevice): void;
  abstract updatePreferredMicrophone(microphone: UserMediaDevice): void;
  abstract requestAccess(): Promise<boolean>;
  abstract getStream(): Promise<MediaStream>;
  abstract stopStream(): void;
}
