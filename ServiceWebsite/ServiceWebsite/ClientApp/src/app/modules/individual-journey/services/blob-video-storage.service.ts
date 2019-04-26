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

    getVideoUrl(videoName: string): string {
        const fileName = this.getVideoFileName(videoName);
        return this.blobStorageService.getVideoUrl(fileName);
    }

    private getVideoFileName(videoName: string): string {
        return VideoFiles[videoName];
    }
}
