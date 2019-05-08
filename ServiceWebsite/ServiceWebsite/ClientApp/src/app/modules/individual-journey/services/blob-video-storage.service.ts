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
    [VideoFiles.BeforeTheDay_JudgeView_Judge, 'btd_judgeview_individual_small.mp4'],
    [VideoFiles.BeforeTheDay_ParticipantView, 'btd_individual_laptop_small.mp4'],
    [VideoFiles.BeforeTheDay_JudgeView_Participant, 'btd_judgeview_judge_small.mp4'],
  ]);

  readonly highResolutions = new Map<VideoFiles, string>([
    [VideoFiles.BeforeTheDay_JudgeView_Judge, 'btd_judgeview_individual_large.mp4'],
    [VideoFiles.BeforeTheDay_ParticipantView, 'btd_individual_laptop_large.mp4'],
    [VideoFiles.BeforeTheDay_JudgeView_Participant, 'btd_judgeview_judge_large.mp4'],
  ]);

  constructor(private blobStorageService: BlobStorageService, private deviceType: DeviceType) {
    super();
  }

  getVideoFileUrl(videoFileName: VideoFiles) {
    const name = this.deviceType.isMobile() ? this.lowResolutions.get(videoFileName) : this.highResolutions.get(videoFileName);
    return this.blobStorageService.getVideoUrl(name);
  }
}
