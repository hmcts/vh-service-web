import { BlobVideoStorageService } from './blob-video-storage.service';
import { BlobStorageService } from './blob-storage.service';
import { DeviceType } from './device-type';
import { Config } from '../../shared/models/config';
import { VideoFiles } from './video-files';

describe('BlobVideoStorageService', () => {

  it('should return the video name for in-hearing video', () => {
    const config = new Config();
    const deviceType = jasmine.createSpyObj<DeviceType>(['isMobile', 'isTablet', 'isDesktop']);
    config.baseVideoUrl = 'http://test.com';
    const blobVideoStorageService = new BlobVideoStorageService(new BlobStorageService(config), deviceType);
    const actualValue = blobVideoStorageService.getVideoFileUrl(VideoFiles.BeforeTheDay_ParticipantView);
    expect(actualValue).toEqual('http://test.com/btd_individual_laptop_large.mp4');
  });

  it('should return the videoname for judge self video', () => {
    const config = new Config();
    const deviceType = jasmine.createSpyObj<DeviceType>(['isMobile', 'isTablet', 'isDesktop']);
    config.baseVideoUrl = 'http://test.com';
    const blobVideoStorageService = new BlobVideoStorageService(new BlobStorageService(config), deviceType);
    const actualValue = blobVideoStorageService.getVideoFileUrl(VideoFiles.BeforeTheDay_JudgeView_Judge);
    expect(actualValue).toEqual('http://test.com/btd_judgeview_individual_large.mp4');
  });

  it('should return the video name for other participant video', () => {
    const config = new Config();
    const deviceType = jasmine.createSpyObj<DeviceType>(['isMobile', 'isTablet', 'isDesktop']);
    config.baseVideoUrl = 'http://test.com';
    const blobVideoStorageService = new BlobVideoStorageService(new BlobStorageService(config), deviceType);
    const actualValue = blobVideoStorageService.getVideoFileUrl(VideoFiles.BeforeTheDay_JudgeView_Participant);
    expect(actualValue).toEqual('http://test.com/btd_judgeview_judge_large.mp4');
  });
});
