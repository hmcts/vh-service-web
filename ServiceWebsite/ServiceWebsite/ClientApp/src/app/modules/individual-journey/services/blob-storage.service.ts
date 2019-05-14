import { Injectable } from '@angular/core';
import { Config } from '../../shared/models/config';

@Injectable({
  providedIn: 'root'
})
export class BlobStorageService {

  baseVideoUrl: string;
  separator = '/';

  constructor(config: Config) {
    this.baseVideoUrl = config.baseVideoUrl;
  }

  getVideoUrl(videoName: string): string {
    if (!!videoName) {
      return this.baseVideoUrl + this.separator + videoName;
    } else {
      throw new Error('Error video file name is invalid.');
    }
  }
}
