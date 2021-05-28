import { UserMediaService } from './user-media.service';
import { LoggerService } from 'src/app/services/logger.service';
import { MediaDeviceTestData } from '../testing/data/media-device-test-data';
import { inject, TestBed } from '@angular/core/testing';
import { Logger } from './logger';
import { MockLogger } from '../testing/mocks/mock-logger';
import { SessionStorage } from '../modules/shared/services/session-storage';
import { UserMediaDevice } from '../modules/shared/models/user-media-device';

describe('UserMediaService', () => {
  const testData = new MediaDeviceTestData();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserMediaService,
        { provide: Logger, useClass: MockLogger }
      ]
    });

    (<any>navigator)['__defineGetter__']('mediaDevices', function () {
      const mediaDevices = jasmine.createSpyObj<MediaDevices>('mediaDevices', ['enumerateDevices', 'ondevicechange', 'getUserMedia']);
      const mediaStream = jasmine.createSpyObj<MediaStream>('MediaStream', ['getAudioTracks', 'getVideoTracks', 'getTracks']);
      const mediaStreamTrack = jasmine.createSpyObj<MediaStreamTrack>('MediaStreamTrack', ['stop', 'kind', 'label', 'id']);
      mediaDevices.enumerateDevices.and.returnValue([MediaDeviceInfo, MediaDeviceInfo]);
      mediaDevices.getUserMedia.and.returnValue(mediaStream);
      mediaStream.getAudioTracks.and.returnValue([mediaStreamTrack, mediaStreamTrack]);
      mediaStream.getVideoTracks.and.returnValue([mediaStreamTrack, mediaStreamTrack]);
      mediaStream.getTracks.and.returnValue([mediaStreamTrack, mediaStreamTrack, mediaStreamTrack, mediaStreamTrack]);
      return mediaDevices;
    });
  });

  it('should return only video devices', inject([UserMediaService], async (service: UserMediaService) => {
    service.availableDeviceList = testData.getListOfDevices();
    const devices = await service.getListOfVideoDevices();
    const unexpectedDevices = devices.filter(x => x.kind !== 'videoinput');
    expect(unexpectedDevices.length).toBe(0);
  }));

  it('should return only microphone devices', inject([UserMediaService], async (service: UserMediaService) => {
    service.availableDeviceList = testData.getListOfDevices();
    const devices = await service.getListOfMicrophoneDevices();
    const unexpectedDevices = devices.filter(x => x.kind !== 'audioinput');
    expect(unexpectedDevices.length).toBe(0);
  }));

  it('should update device list if empty', inject([UserMediaService], async (service: UserMediaService) => {
    spyOn(service, 'updateAvailableDevicesList').and.callFake(() => {
      service.availableDeviceList = testData.getListOfDevices();
    });
    await service.checkDeviceListIsReady();
    expect(service.updateAvailableDevicesList).toHaveBeenCalled();
  }));

  it('should return true when multiple inputs are detected', inject([UserMediaService], async (service: UserMediaService) => {
    spyOn(service, 'getListOfVideoDevices').and.returnValue(testData.getListOfCameras());
    spyOn(service, 'getListOfMicrophoneDevices').and.returnValue(testData.getListOfMicrophones());
    const multipleDevices = await service.hasMultipleDevices();
    expect(multipleDevices).toBeTruthy();
  }));

  it('should return false when single inputs are detected', inject([UserMediaService], async (service: UserMediaService) => {
    spyOn(service, 'getListOfVideoDevices').and.returnValue(testData.getSingleCamera());
    spyOn(service, 'getListOfMicrophoneDevices').and.returnValue(testData.getSingleMicrophone());
    const multipleDevices = await service.hasMultipleDevices();
    expect(multipleDevices).toBeFalsy();
  }));

  it('should update the device list', inject([UserMediaService], async (service: UserMediaService) => {
    spyOn(service, 'updateAvailableDevicesList').and.callFake(() => {
      service.availableDeviceList = testData.getListOfDevices();
    });
    await service.updateAvailableDevicesList();
    expect(service.availableDeviceList.length).toBeGreaterThan(0);
  }));

  it('should return null when cached device is not set', inject([UserMediaService], async (service: UserMediaService) => {
    const sessionStorage = new SessionStorage<UserMediaDevice>(service.PREFERRED_CAMERA_KEY);
    service.availableDeviceList = testData.getListOfDevices();
    sessionStorage.clear();
    const result = service.getCachedDeviceIfStillConnected(sessionStorage);

    expect(result).toBeNull();
  }));

  it('should return null when cached device is not connected', inject([UserMediaService], async (service: UserMediaService) => {
    const sessionStorage = new SessionStorage<UserMediaDevice>(service.PREFERRED_CAMERA_KEY);
    service.availableDeviceList = testData.getListOfDevices();
    service.updatePreferredCamera(new UserMediaDevice('test', 'test', 'test', 'test'));
    const result = service.getCachedDeviceIfStillConnected(sessionStorage);

    expect(result).toBeNull();
  }));

  it('should get cached device if still connected', inject([UserMediaService], async (service: UserMediaService) => {
    const sessionStorage = new SessionStorage<UserMediaDevice>(service.PREFERRED_CAMERA_KEY);
    service.availableDeviceList = testData.getListOfDevices();
    const cachedDevice = testData.getListOfDevices()[0];
    service.updatePreferredCamera(cachedDevice);
    const result = service.getCachedDeviceIfStillConnected(sessionStorage);

    expect(result.deviceId).toBe(cachedDevice.deviceId);
  }));

  it('should update preferred microphone', inject([UserMediaService], async (service: UserMediaService) => {
    const cachedDevice = testData.getListOfDevices()[0];
    service.availableDeviceList = testData.getListOfDevices();
    service.updatePreferredMicrophone(cachedDevice);
    expect(service.getPreferredMicrophone()).toBeTruthy();
  }));

  it('should update preferred camera', inject([UserMediaService], async (service: UserMediaService) => {
    const cachedDevice = testData.getListOfDevices()[1];
    service.availableDeviceList = testData.getListOfDevices();
    service.updatePreferredCamera(cachedDevice);
    expect(service.getPreferredCamera()).toBeTruthy();
  }));

  it('should throw error when update device list from navigator devices', inject([UserMediaService], async (service: UserMediaService) => {
    (<any>navigator)['__defineGetter__']('mediaDevices', function () {
      return jasmine.createSpyObj<MediaDevices>('mediaDevices', ['ondevicechange', 'getUserMedia']);
    });

    let error;
    try {
      await service.updateAvailableDevicesList();
    } catch (e) {
      error = e;
    }
    const expectedError = new Error('enumerateDevices() not supported.');
    expect(error).toEqual(expectedError);
  }));

  it('should update device list from navigator devices', inject([UserMediaService], async (service: UserMediaService) => {
    await service.updateAvailableDevicesList();
    expect(service.availableDeviceList).toBeTruthy();
    expect(service.availableDeviceList.length).toBeGreaterThan(0);
  }));

  it('should return the media stream', async () => {
    const logger = jasmine.createSpyObj<LoggerService>(['error']);
    const userMediaService = new UserMediaService(logger);
    let stream = await userMediaService.getStream();
    stream = await userMediaService.getStream();
    expect(stream).not.toBeNull();
    userMediaService.stopStream();
  });

  it('should return media access request successful', async () => {
    const logger = jasmine.createSpyObj<LoggerService>(['error']);
    const userMediaService = new UserMediaService(logger);
    const result = await userMediaService.requestAccess();
    expect(result).not.toBeNull();
    expect(result).toBeTruthy();
    userMediaService.stopStream();
  });

  it('should fail to get access to media return false', async () => {
    const logger = jasmine.createSpyObj<LoggerService>(['error']);
    const userMediaService = new UserMediaService(logger);
    spyOn(userMediaService, 'getStream').and.throwError('Failed to get access to user media');
    const result = await userMediaService.requestAccess();
    expect(result).not.toBeNull();
    expect(result.result).toBeFalsy();
    userMediaService.stopStream();
  });
});
