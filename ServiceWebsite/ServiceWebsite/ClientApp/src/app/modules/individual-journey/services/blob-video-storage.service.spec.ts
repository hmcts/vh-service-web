import { BlobVideoStorageService } from './blob-video-storage.service';
import { BlobStorageService } from './blob-storage.service';
import { Config } from '../../shared/models/config';

describe('BlobVideoStorageService', () => {

    it('should return the videoname from constants', () => {
        const config = new Config();
        config.baseVideoUrl = 'http://test.com';

        const blobVideoStorageService = new BlobVideoStorageService(new BlobStorageService(config));
        const actualValue = blobVideoStorageService.getVideoUrl('BeforeTheDay_ParticipantView');
        expect(actualValue).toEqual('http://test.com/btd_individual_laptop_large.mp4');
    });
});
