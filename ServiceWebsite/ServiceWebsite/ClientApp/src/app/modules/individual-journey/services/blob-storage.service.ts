import { Injectable } from '@angular/core';
import { Config } from '../../shared/models/config';

@Injectable()
export class BlobStorageService {

    baseVideoUrl: string;
    separator = '/';

    constructor(config: Config) {
        this.baseVideoUrl = config.baseVideoUrl;
    }

    getVideoUrl(videoName: string): string {
        return this.baseVideoUrl + this.separator + videoName;
    }
}
