import { Injectable } from '@angular/core';
import { Config } from '../../shared/models/config';
import { ConfigService } from 'src/app/services/config.service';

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
        return this.baseVideoUrl + this.separator + videoName;
    }
}
