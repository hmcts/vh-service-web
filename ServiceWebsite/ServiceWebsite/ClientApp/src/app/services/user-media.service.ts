import { Injectable, } from '@angular/core';
import { MediaService } from './media.service';
import { Logger } from '../services/logger';

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

  constructor(private logger: Logger) {
    super();
  }

  async requestAccess(): Promise<boolean> {
    try {
      await this.getStream();
      return true;
    } catch (exception) {
      this.logger.error('Failed to get access to user media', exception);
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
