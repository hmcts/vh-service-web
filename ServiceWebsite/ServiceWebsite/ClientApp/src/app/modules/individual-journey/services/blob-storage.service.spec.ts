import { BlobStorageService } from './blob-storage.service';
import { Config } from '../../shared/models/config';

describe('BlobStorageService', () => {
    it('should return the video uri - baseurl + videoname', () => {
        const config = new Config();
        config.baseVideoUrl = 'http://test.com';
        const blobStorageService = new BlobStorageService(config);
        const actualValue = blobStorageService.getVideoUrl('videoFileName');
        expect(actualValue).toEqual('http://test.com/videoFileName');
    });
});
