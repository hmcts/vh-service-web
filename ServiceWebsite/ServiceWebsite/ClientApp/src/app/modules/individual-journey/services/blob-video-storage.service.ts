import { Injectable } from '@angular/core';
import { VideoUrlService } from './video-url.service';
import { BlobStorageService } from './blob-storage.service';

@Injectable()
export class BlobVideoStorageService extends VideoUrlService {

    constructor(blobStorageService: BlobStorageService) {
        super();
    }
}
