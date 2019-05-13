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

  it('should throws an error if video file name is invalid', () => {
    const config = new Config();
    config.baseVideoUrl = 'http://test.com';
    const blobStorageService = new BlobStorageService(config);
    expect(() => { blobStorageService.getVideoUrl(undefined); }
    ).toThrowError('Error video file name is invalid.');
  });
});
