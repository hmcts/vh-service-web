import { Injectable, } from '@angular/core';
import { MediaService } from './media.service';

@Injectable({
  providedIn: 'root',
})
export class UserMediaService extends MediaService {

  browser = <any>navigator;
  constraints: MediaStreamConstraints;
  stream: MediaStream;

  constructor() {
    super();
    this.initialize();
  }

  private initialize() {
    this.browser.mediaDevices.getUserMedia = (this.browser.mediaDevices.getUserMedia ||
      this.browser.webkitGetUserMedia ||
      this.browser.mozGetUserMedia ||
      this.browser.msGetUserMedia);

    this.constraints = {
      audio: true,
      video: { facingMode: { exact: "user" } }
    };
  }

  getStream(): Promise<MediaStream> {
    if (this.stream) {
      this.stopStream();
    }
    let currentStream = this.browser.mediaDevices.getUserMedia(this.constraints);
    return currentStream.then(s => {
      this.stream = s;
      return new Promise<MediaStream>((resolve, reject) => { resolve(s); });
    });
  }

  stopStream() {
    if (this.stream) {
      this.stream.getAudioTracks().map((track) => {
        track.stop();
      });
      this.stream.getVideoTracks().map((track) => {
        track.stop();
      });
    }
  }
}
