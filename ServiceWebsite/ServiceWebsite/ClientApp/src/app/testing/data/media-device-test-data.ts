import { UserMediaDevice } from '../../modules/self-test-journey/models/user-media-device';

export class MediaDeviceTestData {
  getListOfDevices() {
    let testData: Array<UserMediaDevice> = [];
    testData = testData.concat(this.getListOfCameras());
    testData = testData.concat(this.getListOfMicrophones());
    const defaultDevice = new UserMediaDevice('camera1', 'default', 'videoinput', 'group1');
    const soundOutput = new UserMediaDevice('audiooutput1', 'audiooutput1', 'audiooutput', 'group1');

    testData.push(defaultDevice);
    testData.push(soundOutput);
    return testData;
  }

  getListOfSingleCameraAndMicDevices() {
    let testData: Array<UserMediaDevice> = [];
    testData = testData.concat(this.getSingleCamera());
    testData = testData.concat(this.getSingleMicrophone());
    return testData;
  }

  getSingleCamera(): UserMediaDevice[] {
    const device = new UserMediaDevice('camera1', 'camId1', 'videoinput', 'group1');
    return this.getSingleDevice(device);
  }

  private getSingleDevice(device: UserMediaDevice): UserMediaDevice[] {
    const testData: UserMediaDevice[] = [];
    testData.push(device);
    return testData;
  }

  getListOfCameras(): UserMediaDevice[] {
    const testData: UserMediaDevice[] = [];
    const device = new UserMediaDevice('camera1', 'camId1', 'videoinput', 'group1');
    const device2 = new UserMediaDevice('camera2', 'camId2', 'videoinput', 'group2');
    testData.push(device);
    testData.push(device2);
    return testData;
  }

  getSingleMicrophone(): UserMediaDevice[] {
    const device = new UserMediaDevice('mic1', 'micId1', 'audioinput', 'group1');
    return this.getSingleDevice(device);
  }

  getListOfMicrophones(): UserMediaDevice[] {
    const testData: UserMediaDevice[] = [];
    const device = new UserMediaDevice('mic1', 'micId1', 'audioinput', 'group1');
    const device2 = new UserMediaDevice('mic2', 'micId2', 'audioinput', 'group2');
    testData.push(device);
    testData.push(device2);
    return testData;
  }
}
