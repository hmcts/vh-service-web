import { Injectable, } from '@angular/core';
import 'webrtc-adapter';
import { Logger } from '../../../services/logger';
import {UserMediaDevice} from '../../shared/models/user-media-device';

@Injectable({
  providedIn: 'root',
})
export class UserMediaStreamService {

  readonly permissionConstraints = {
    audio: true,
    video: true
  };

  _navigator = <any>navigator;

  private requestStream: MediaStream;

  constructor(private logger: Logger) {
  }

  async requestAccess(): Promise<boolean> {
    try {
      /*
      If a user grants access a stream is returned, which needs to be closed
      rather than being returned to the client.
      */
      await this.getStream();

      this.stopRequestStream();
      return true;
    } catch (exception) {
      this.logger.error('could not get cam and mic access', exception);
      return false;
    }
  }

  private stopRequestStream() {
    this.stopStream(this.requestStream);
  }

  private async getStream(): Promise<MediaStream> {
    if (this.requestStream) {
      this.stopStream(this.requestStream);
    }

    this.requestStream = await this._navigator.mediaDevices.getUserMedia(this.permissionConstraints);
    return this.requestStream;
  }

  async getStreamForMic(device: UserMediaDevice): Promise<MediaStream> {
    try {
      if (device) {

        const isFireFox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
        const deviceId = isFireFox ? device.deviceId : await this.getDeviceId(device.label);

        const stream = await this._navigator.mediaDevices.getUserMedia(
          { audio: { deviceId: { exact: deviceId } } }
        );
        return stream;
      } else {
        return this.getDefaultMicStream();
      }
    } catch (exception) {
      this.logger.error('could not re-set microphone', exception);
    }
  }

  async getStreamForCam(device: UserMediaDevice): Promise<MediaStream> {
    try {
      if (device) {
        const isFireFox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
        const deviceId = isFireFox ? device.deviceId : await this.getDeviceId(device.label);
        const stream = await this._navigator.mediaDevices.getUserMedia(
         { video: { deviceId: { exact: deviceId } } }
        );
       return stream;
      } else {
        return this.getDefaultCamStream();
      }
    } catch (exception) {
      this.logger.error('could not re-set camera', exception);
    }
  }

  private async getDeviceId(deviceName: string) {
    const availableDevices: MediaDeviceInfo[] = await this._navigator.mediaDevices.enumerateDevices();
    const filteredDevices = availableDevices.filter(x => x.label === deviceName);
    return filteredDevices[0].deviceId;
  }

  private async getDefaultCamStream(): Promise<MediaStream> {
    return await this._navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    });
  }

  private async getDefaultMicStream(): Promise<MediaStream> {
    return await this._navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
  }

  stopStream(stream: MediaStream) {
    if (!stream) {
      return;
    }

    stream.getTracks().forEach((track) => {
      track.stop();
    });
  }
}
