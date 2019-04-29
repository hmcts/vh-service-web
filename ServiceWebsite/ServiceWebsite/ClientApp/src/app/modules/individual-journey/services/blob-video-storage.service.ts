import { Injectable } from '@angular/core';
import { VideoUrlService } from './video-url.service';
import { BlobStorageService } from './blob-storage.service';
import { VideoFiles } from './video-files';

@Injectable({
    providedIn: 'root'
})
export class BlobVideoStorageService extends VideoUrlService {

    constructor(private blobStorageService: BlobStorageService) {
        super();
    }

    get inHearingExampleVideo() {
        return this.blobStorageService.getVideoUrl(VideoFiles.BeforeTheDay_ParticipantView);
    }

    get judgeSelfViewVideo() {
        return this.blobStorageService.getVideoUrl(VideoFiles.BeforeTheDay_JudgeView_Judge);
    }

    get otherParticipantExampleVideo() {
        return this.blobStorageService.getVideoUrl(VideoFiles.BeforeTheDay_JudgeView_Participant);
    }
}
