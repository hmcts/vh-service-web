import { BlobVideoStorageService } from './blob-video-storage.service';
import { BlobStorageService } from './blob-storage.service';
import { Config } from '../../shared/models/config';

describe('BlobVideoStorageService', () => {

    it('should return the videoname for in-hearing video', () => {
        const config = new Config();
        config.baseVideoUrl = 'http://test.com';
        const blobVideoStorageService = new BlobVideoStorageService(new BlobStorageService(config));
        const actualValue = blobVideoStorageService.inHearingExampleVideo;
        expect(actualValue).toEqual('http://test.com/btd_individual_laptop_large.mp4');
    });

    it('should return the videoname for judge self video', () => {
        const config = new Config();
        config.baseVideoUrl = 'http://test.com';
        const blobVideoStorageService = new BlobVideoStorageService(new BlobStorageService(config));
        const actualValue = blobVideoStorageService.judgeSelfViewVideo;
        expect(actualValue).toEqual('http://test.com/btd_judgeview_individual_large.mp4');
    });

    it('should return the videoname for other participant video', () => {
        const config = new Config();
        config.baseVideoUrl = 'http://test.com';
        const blobVideoStorageService = new BlobVideoStorageService(new BlobStorageService(config));
        const actualValue = blobVideoStorageService.otherParticipantExampleVideo;
        expect(actualValue).toEqual('http://test.com/btd_judgeview_judge_large.mp4');
    });
});
