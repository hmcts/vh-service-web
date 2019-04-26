import { Injectable, } from '@angular/core';
import { MediaService } from './media.service';

const browser = <any>navigator;
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
    this.initialize();
  }

  private initialize() {
    browser.mediaDevices.getUserMedia = (browser.mediaDevices.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);
  }

  getStream(): Promise<MediaStream> {
    if (this.stream) {
      this.stopStream();
    }
    const currentStream = browser.mediaDevices.getUserMedia(this.constraints);
    return currentStream.then(s => {
      if (s instanceof MediaStream) {
        this.stream = s;
        return new Promise<MediaStream>((resolve, reject) => { resolve(s); });
      } else {
        return new Promise<string>((resolve, reject) => { reject('Error'); });
      }
    });
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
