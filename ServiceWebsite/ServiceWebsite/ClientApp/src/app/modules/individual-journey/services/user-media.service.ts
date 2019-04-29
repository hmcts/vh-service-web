import { Injectable, } from '@angular/core';
import { MediaService } from './media.service';
import { LoggerService } from '../../../services/logger.service';

const browser = <any>navigator;
browser.mediaDevices.getUserMedia = (browser.mediaDevices.getUserMedia ||
  browser.webkitGetUserMedia ||
  browser.mozGetUserMedia ||
  browser.msGetUserMedia);

@Injectable({
  providedIn: 'root',
})
export class UserMediaService extends MediaService {

  readonly constraints: MediaStreamConstraints = {
    audio: true,
    video: true
  };

  private stream: MediaStream;

  constructor(private logger: LoggerService) {
    super();
  }

  async requestAccess(): Promise<boolean> {
    try {
      await this.getStream();
      return true;
    } catch (exception) {
      this.logger.error('error', exception, null);
      return false;
    }
  }

  async getStream(): Promise<MediaStream> {
    if (this.stream) {
      this.stopStream();
    }

    this.stream = await browser.mediaDevices.getUserMedia(this.constraints);
    return this.stream;
  }

  stopStream() {
    if (!this.stream) {
      return;
    }

    this.stream.getAudioTracks().forEach((track) => {
      track.stop();
    });
    this.stream.getVideoTracks().forEach((track) => {
      track.stop();
    });
  }
}
