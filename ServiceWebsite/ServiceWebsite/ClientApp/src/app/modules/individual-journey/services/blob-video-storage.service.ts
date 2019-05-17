import { Injectable } from '@angular/core';
import { VideoUrlService } from './video-url.service';
import { BlobStorageService } from './blob-storage.service';
import { VideoFiles } from './video-files';
import { DeviceType } from './device-type';

@Injectable({
  providedIn: 'root'
})
export class BlobVideoStorageService extends VideoUrlService {

  readonly lowResolutions = new Map<VideoFiles, string>([
    [VideoFiles.BeforeTheDay_ParticipantView, 'btd_individual_laptop_small.mp4'],
    [VideoFiles.BeforeTheDay_Court, 'btd_court_small.mp4'],
  ]);

  readonly highResolutions = new Map<VideoFiles, string>([
    [VideoFiles.BeforeTheDay_ParticipantView, 'btd_individual_laptop_large.mp4'],
    [VideoFiles.BeforeTheDay_Court, 'btd_court.mp4'],
  ]);

  constructor(private blobStorageService: BlobStorageService, private deviceType: DeviceType) {
    super();
  }

  getVideoFileUrl(videoFileName: VideoFiles) {
    const name = this.deviceType.isMobile() ? this.lowResolutions.get(videoFileName) : this.highResolutions.get(videoFileName);
    if (!!name) {
      return this.blobStorageService.getVideoUrl(name);
    } else {
      throw new Error('Error video file name is invalid.');
    }
  }
}
