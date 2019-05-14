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
    deviceType.isMobile.and.returnValue(true);
    expect(blobVideoStorageService.getVideoFileUrl(VideoFiles.BeforeTheDay_JudgeView_Judge)).toBeTruthy();
    expect(blobVideoStorageService.getVideoFileUrl(VideoFiles.BeforeTheDay_JudgeView_Participant)).toBeTruthy();
    expect(blobVideoStorageService.getVideoFileUrl(VideoFiles.BeforeTheDay_ParticipantView)).toBeTruthy();
  });

  it('should return the video url for file with small resolution if mobile device', () => {
    const config = new Config();
    const deviceType = jasmine.createSpyObj<DeviceType>(['isMobile', 'isTablet', 'isDesktop']);
    config.baseVideoUrl = 'http://test.com';
    const blobVideoStorageService = new BlobVideoStorageService(new BlobStorageService(config), deviceType);
    deviceType.isMobile.and.returnValue(true);
    const fileName = blobVideoStorageService.getVideoFileUrl(VideoFiles.BeforeTheDay_JudgeView_Judge);
    expect(fileName.includes('small')).toBeTruthy();
  });

  it('should return the video url for file with large resolution if tablet or desktop device', () => {
    const config = new Config();
    const deviceType = jasmine.createSpyObj<DeviceType>(['isMobile', 'isTablet', 'isDesktop']);
    config.baseVideoUrl = 'http://test.com';
    const blobVideoStorageService = new BlobVideoStorageService(new BlobStorageService(config), deviceType);
    deviceType.isMobile.and.returnValue(false);
    const fileName = blobVideoStorageService.getVideoFileUrl(VideoFiles.BeforeTheDay_JudgeView_Judge);
    expect(fileName.includes('large')).toBeTruthy();
  });

  it('should throw an error if invalid video file name', () => {
    const config = new Config();
    const deviceType = jasmine.createSpyObj<DeviceType>(['isMobile', 'isTablet', 'isDesktop']);
    config.baseVideoUrl = 'http://test.com';
    const blobVideoStorageService = new BlobVideoStorageService(new BlobStorageService(config), deviceType);
    deviceType.isMobile.and.returnValue(true);
    expect(() => { blobVideoStorageService.getVideoFileUrl(undefined); }
    ).toThrowError('Error video file name is invalid.');  });
});
