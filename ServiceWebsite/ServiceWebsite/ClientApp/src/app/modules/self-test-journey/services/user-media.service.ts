import { Injectable, } from '@angular/core';
import 'webrtc-adapter';
import { UserMediaDevice } from '../models/user-media-device';
import { SessionStorage } from '../../shared/services/session-storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserMediaService {

    _navigator = <any>navigator;

    private readonly preferredCamCache: SessionStorage<UserMediaDevice>;
    private readonly preferredMicCache: SessionStorage<UserMediaDevice>;
    readonly PREFERRED_CAMERA_KEY = 'vh.preferred.camera';
    readonly PREFERRED_MICROPHONE_KEY = 'vh.preferred.microphone';

    availableDeviceList: UserMediaDevice[];

    connectedDevices: BehaviorSubject<UserMediaDevice[]> = new BehaviorSubject([]);

    constructor() {
        this.preferredCamCache = new SessionStorage(this.PREFERRED_CAMERA_KEY);
        this.preferredMicCache = new SessionStorage(this.PREFERRED_MICROPHONE_KEY);

        this._navigator.getUserMedia = (this._navigator.getUserMedia || this._navigator.webkitGetUserMedia
            || this._navigator.mozGetUserMedia || this._navigator.msGetUserMedia);

        this._navigator.mediaDevices.ondevicechange = async () => {
            await this.updateAvailableDevicesList();
        };
    }

    async getListOfVideoDevices(): Promise<UserMediaDevice[]> {
        await this.checkDeviceListIsReady();
        return this.availableDeviceList.filter(x => x.kind === 'videoinput');
    }

    async getListOfMicrophoneDevices(): Promise<UserMediaDevice[]> {
        await this.checkDeviceListIsReady();
        return this.availableDeviceList.filter(x => x.kind === 'audioinput');
    }

    async checkDeviceListIsReady() {
        if (!this.availableDeviceList) {
            await this.updateAvailableDevicesList();
        }
    }

    async updateAvailableDevicesList(): Promise<void> {
        if (!this._navigator.mediaDevices || !this._navigator.mediaDevices.enumerateDevices) {
            throw new Error('enumerateDevices() not supported.');
        }

        let updatedDevices: MediaDeviceInfo[] = await this._navigator.mediaDevices.enumerateDevices();
        updatedDevices = updatedDevices.filter(x => x.deviceId !== 'default' && x.kind !== 'audiooutput');
        this.availableDeviceList = Array.from(updatedDevices, device =>
            new UserMediaDevice(device.label, device.deviceId, device.kind, device.groupId)
        );
        this.connectedDevices.next(this.availableDeviceList);
    }

    async hasMultipleDevices(): Promise<boolean> {
        const camDevices = await this.getListOfVideoDevices();
        const micDevices = await this.getListOfMicrophoneDevices();
        return micDevices.length > 1 || camDevices.length > 1;
    }

    getPreferredCamera() {
        return this.getCachedDeviceIfStillConnected(this.preferredCamCache);
    }

    getPreferredMicrophone() {
        return this.getCachedDeviceIfStillConnected(this.preferredMicCache);
    }

    getCachedDeviceIfStillConnected(cache: SessionStorage<UserMediaDevice>): UserMediaDevice {
        const device = cache.get();
        if (!device) {
            return null;
        }

        const stillConnected = this.availableDeviceList.find(x => x.label === device.label);
        if (stillConnected) {
            return device;
        } else {
            cache.clear();
            return null;
        }
    }

    updatePreferredCamera(camera: UserMediaDevice) {
        this.preferredCamCache.set(camera);
    }

    updatePreferredMicrophone(microphone: UserMediaDevice) {
        this.preferredMicCache.set(microphone);
    }
}