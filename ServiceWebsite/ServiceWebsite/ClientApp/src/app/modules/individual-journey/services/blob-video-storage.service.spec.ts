import { BlobVideoStorageService } from './blob-video-storage.service';
import { BlobStorageService } from './blob-storage.service';
import { DeviceType } from './device-type';
import { Config } from '../../shared/models/config';
import { VideoFiles } from './video-files';

describe('BlobVideoStorageService', () => {

  it('should return the video url for each video', () => {
    const config = new Config();
    const deviceType = jasmine.createSpyObj<DeviceType>(['isMobile', 'isTablet', 'isDesktop']);
    config.baseVideoUrl = 'http://test.com';
    const blobVideoStorageService = new BlobVideoStorageService(new BlobStorageService(config), deviceType);

    for (const key of Object.keys(VideoFiles)) {
      expect(blobVideoStorageService.getVideoFileUrl(VideoFiles[key])).not.toBeNull();
    }
  });

});
