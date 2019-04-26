import { Injectable, } from '@angular/core';
import { MediaService } from './media.service';

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
    video: { facingMode: { exact: 'user' } }
  };

  private stream: MediaStream;

  constructor() {
    super();
  }

  async getStream(): Promise<MediaStream> {
    if (this.stream) {
      this.stopStream();
    }

    this.stream = await browser.mediaDevices.getUserMedia(this.constraints);
    return this.stream;
  }

  stopStream() {
    if (this.stream) {
      this.stream.getAudioTracks().forEach((track) => {
        track.stop();
      });
      this.stream.getVideoTracks().forEach((track) => {
        track.stop();
      });
    }
  }
}
