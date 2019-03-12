import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { SpeedTestModel } from '../models/speedtest.model';


export enum TestType {
    Upload = 1,
    Download = 2,
    None = 0
}

@Injectable()
export class SpeedTestService {
    // Speed test variables
    private started = false;
    private pingCount = 5;
    private bestPing: number = null;
    private pingClient: XMLHttpRequest = null;
    private downloadStartTime: number = null;
    private downloadClient: XMLHttpRequest = null;
    private uploadSize = 204799;
    private uploadStartTime: number = null;
    private uploadClient: XMLHttpRequest = null;
    private uploadContent: string = null;
    private downloadUrl = 'https://www.bing.com/speedtest/';
    private uploadUrl = 'https://www.bing.com/speedtestupload';
    private pingTime: number = null;
    private downloadSpeed: number = null;
    private uploadSpeed: number = null;
    private movingWindow: number[] = [];
    private movingWindowSize = 50;
    private movingWindowIndex = 0;
    private useFullIndex = false;
    private currentSpeed: number[] = [];
    private connection = 3;

    private speedTestSubject = new Subject<SpeedTestModel>();
    speedTestState$: Observable<SpeedTestModel>;

    constructor() {
        this.speedTestState$ = this.speedTestSubject.asObservable();
    }

    /**
     * Current running status
     * @returns {nothing}
     */
    public isRunning(): boolean {
        try {
            return this.started;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Start or stop after clicking the button
     * @returns {nothing}
     */
    public click() {
        try {
            if (!this.started) {
                this.start();
            } else {
                this.stop();
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * Start test.
     * @returns {nothing}
     */
    public start() {
        try {
            this.started = true;
            this.resetValue();
            this.pingServer(0);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Stop test.
     * @returns {nothing}
     */
    public stop() {
        try {
            this.started = false;
            this.instrumentation();
            this.resetValue();
        } catch (e) {
            throw e;
        }
    }

    /**
     * Reset all Speed Test variables
     * @returns {nothing}
     */
    private resetValue() {
        try {
            this.bestPing = null;
            this.downloadStartTime = null;
            this.uploadStartTime = null;

            if (this.pingClient !== null) {
                this.pingClient.onprogress = function () { };
                this.pingClient.onreadystatechange = function () { };
                this.pingClient.abort();
            }

            if (this.downloadClient !== null) {
                this.downloadClient.onprogress = function () { };
                this.downloadClient.onreadystatechange = function () { };
                this.downloadClient.abort();
            }

            if (this.uploadClient !== null) {
                this.uploadClient.onprogress = function () { };
                this.uploadClient.onreadystatechange = function () { };
                this.uploadClient.abort();
            }

            this.pingClient = null;
            this.downloadClient = null;
            this.uploadClient = null;

            this.pingTime = null;
            this.downloadSpeed = null;
            this.uploadSpeed = null;
            this.movingWindow = [];
            this.movingWindowIndex = 0;
            this.useFullIndex = false;

            for (let i = 0; i < this.connection; i++) {
                this.currentSpeed[i] = 0;
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * Ping the server and choose the best ping time
     * @param num Ping times
     * @returns {nothing}
     */
    private pingServer(num: number) {
        try {
            if (!this.started) {
                return;
            }

            if (num >= this.pingCount) {
                this.pingTime = this.bestPing;
                this.showPingResult(this.bestPing);
                this.downloadTest();

                for (let i = 0; i < this.connection; i++) {
                    this.downloadTestDummy(i);
                }

                return;
            }

            let startTime: number;
            this.pingClient = new XMLHttpRequest();
            const self = this;

            this.pingClient.onreadystatechange = function () {
                try {
                    if (this.readyState === 2) {
                        startTime = new Date().getTime();
                    } else if (this.readyState === 4) {
                        // choose best time
                        const newTime = new Date().getTime() - startTime;

                        if (self.bestPing === null || newTime < self.bestPing) {
                            self.bestPing = newTime;
                        }

                        self.pingClient.onprogress = function () { };
                        self.pingClient.onreadystatechange = function () { };
                        self.pingClient.abort();
                        // ping next
                        self.pingServer(num + 1);
                    }
                } catch (e) {
                    throw e;
                }
            };

            this.pingClient.open('GET', this.downloadUrl + 'latency.txt?num=' + num + '&dt=' + Math.random() * 10000000000000000, true);
            this.pingClient.responseType = 'blob';
            this.pingClient.send();
        } catch (e) {
            throw e;
        }
    }

    /**
     * Perform the download speed test
     * @returns {nothing}
     */
    private downloadTest() {
        try {
            if (!this.started) {
                return;
            }

            this.downloadClient = new XMLHttpRequest();
            const self = this;

            this.downloadClient.onprogress = function (evt) {
                try {
                    if (evt.lengthComputable) {
                        // evt.loaded the bytes browser receive
                        // evt.total the total bytes seted by the header
                        const diff = new Date().getTime() - self.downloadStartTime;

                        if (diff <= 0) {
                            return;
                        } else if (diff >= 8000) {
                            // stop after 8 seconds
                            self.downloadClient.onprogress = function () { };
                            self.downloadClient.onreadystatechange = function () { };
                            self.downloadClient.abort();
                            self.delay(2000);
                            return;
                        }

                        let speedInMbps = 8 * evt.loaded / 1000 / 1000 / (diff / 1000);

                        for (let i = 0; i < self.connection; i++) {
                            speedInMbps += self.currentSpeed[i];
                        }

                        self.movingWindow[self.movingWindowIndex++] = speedInMbps;
                        if (self.movingWindowIndex >= self.movingWindowSize) {
                            self.useFullIndex = true;
                            self.movingWindowIndex = 0;
                        }
                    }
                } catch (e) {
                    throw e;
                }
            };
            this.downloadClient.onreadystatechange = function () {
                try {
                    if (this.readyState === 2) {
                        self.downloadStartTime = new Date().getTime();
                    } else if (this.readyState === 4) {
                        self.downloadClient.onprogress = function () { };
                        self.downloadClient.onreadystatechange = function () { };
                        self.downloadClient.abort();
                        self.delay(2000);
                    }
                } catch (e) {
                    throw e;
                }
            };

            this.downloadClient.open('GET', this.downloadUrl + 'extraextralarge.txt?dt=' + Math.random() * 10000000000000000, true);
            this.downloadClient.responseType = 'blob';
            this.downloadClient.send();
        } catch (e) {
            throw e;
        }
    }

    /**
     * Dummy download speed test
     * @param num Connection number
     * @returns {nothing}
     */
    private downloadTestDummy(num: number) {
        try {
            if (!this.started) {
                return;
            }

            let downloadStartTimeDummy: number;
            const downloadClientDummy = new XMLHttpRequest();
            const self = this;

            downloadClientDummy.onprogress = function (evt) {
                try {
                    if (!self.started) {
                        downloadClientDummy.onprogress = function () { };
                        downloadClientDummy.onreadystatechange = function () { };
                        downloadClientDummy.abort();
                        return;
                    }

                    if (evt.lengthComputable) {
                        const diff = new Date().getTime() - downloadStartTimeDummy;

                        if (diff <= 0) {
                            return;
                        } else if (diff >= 8000) {
                            // stop after 8 seconds
                            downloadClientDummy.onprogress = function () { };
                            downloadClientDummy.onreadystatechange = function () { };
                            downloadClientDummy.abort();
                            return;
                        }

                        const speedInMbps = 8 * evt.loaded / 1000 / 1000 / (diff / 1000);
                        self.currentSpeed[num] = speedInMbps;
                    }
                } catch (e) {
                    throw e;
                }
            };
            downloadClientDummy.onreadystatechange = function () {
                try {
                    if (this.readyState === 2) {
                        downloadStartTimeDummy = new Date().getTime();
                    } else if (this.readyState === 4) {
                        this.onprogress = function () { };
                        this.onreadystatechange = function () { };
                        this.abort();
                    }
                } catch (e) {
                    throw e;
                }
            };

            downloadClientDummy.open('GET', this.downloadUrl + 'extraextralarge.txt?dt=' + Math.random() * 10000000000000000, true);
            downloadClientDummy.responseType = 'blob';
            downloadClientDummy.send();
        } catch (e) {
            throw e;
        }
    }

    /**
     * Delay between download and upload test
     * @param time Time to delay
     * @returns {nothing}
     */
    private delay(time: number) {
        try {
            setTimeout(() => { this.showSpeedResult(TestType.Download); }, time);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Perform the upload speed test
     * @returns {nothing}
     */
    private uploadTest() {
        try {
            if (!this.started) {
                return;
            }

            if (new Date().getTime() - this.uploadStartTime >= 8000) {
                this.showSpeedResult(TestType.Upload);
                this.stop();
                return;
            }

            const startTime = new Date().getTime();
            this.uploadClient = new XMLHttpRequest();
            const self = this;

            this.uploadClient.onreadystatechange = function () {
                try {
                    if (this.readyState === 4) {
                        const newTime = new Date().getTime() - startTime;
                        let speedInMbps = 8 * self.uploadSize / 1000 / 1000 / (newTime / 1000);

                        for (let i = 0; i < self.connection; i++) {
                            speedInMbps += self.currentSpeed[i];
                        }

                        self.movingWindow[self.movingWindowIndex++] = speedInMbps;
                        if (self.movingWindowIndex >= self.movingWindowSize) {
                            self.useFullIndex = true;
                            self.movingWindowIndex = 0;
                        }

                        self.uploadClient.onprogress = function () { };
                        self.uploadClient.onreadystatechange = function () { };
                        self.uploadClient.abort();
                        self.uploadTest();
                    }
                } catch (e) {
                    throw e;
                }
            };

            this.uploadClient.open('POST', this.uploadUrl + '?dt=' + Math.random() * 10000000000000000, true);
            this.uploadClient.send(this.uploadContent);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Dummy upload speed test
     * @param num Connection number
     * @returns {nothing}
     */
    private uploadTestDummy(num: number) {
        try {
            if (!this.started) {
                return;
            }

            if (new Date().getTime() - this.uploadStartTime >= 5000) {
                return;
            }

            const uploadStartTimeDummy = new Date().getTime();
            const uploadClientDummy = new XMLHttpRequest();
            const self = this;

            uploadClientDummy.onprogress = function () {
                try {
                    if (!self.started) {
                        uploadClientDummy.onprogress = function () { };
                        uploadClientDummy.onreadystatechange = function () { };
                        uploadClientDummy.abort();
                        return;
                    }
                } catch (e) {
                    throw e;
                }
            };
            uploadClientDummy.onreadystatechange = function () {
                try {

                    if (this.readyState === 4) {
                        const newTime = new Date().getTime() - uploadStartTimeDummy;
                        const speedInMbps = 8 * self.uploadSize / 1000 / 1000 / (newTime / 1000);
                        self.currentSpeed[num] = speedInMbps;
                        this.onprogress = function () { };
                        this.onreadystatechange = function () { };
                        this.abort();
                        self.uploadTestDummy(num);
                    }
                } catch (e) {
                    throw e;
                }
            };

            uploadClientDummy.open('POST', this.uploadUrl + '?dt=' + Math.random() * 10000000000000000, true);
            uploadClientDummy.send(this.uploadContent);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Show the final ping result and update views
     * @param ping Ping time
     * @returns {nothing}
     */
    private showPingResult(ping: number) {
        try {
            if (!this.started) {
                return;
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * Show the final speed result and update views
     * @param speedTestType Speed Test Type
     * @returns {nothing}
     */
    private showSpeedResult(speedTestType: TestType) {
        try {
            if (!this.started) {
                return;
            }

            const length = this.useFullIndex ? this.movingWindowSize : this.movingWindowIndex;

            if (length > 0) {
                let speed = 0;
                let i: number;


                if (this.useFullIndex) {
                    // Use max if we have enough data points
                    for (i = 0; i < length; i++) {
                        speed = Math.max(speed, this.movingWindow[i]);
                    }
                } else {
                    // Use avg if not
                    let sum = 0;

                    for (i = 0; i < length; i++) {
                        sum += this.movingWindow[i];
                    }

                    speed = sum / length;
                }


                if (speedTestType === TestType.Download) {
                    this.downloadSpeed = speed;
                    this.movingWindow = [];
                    this.movingWindowIndex = 0;
                    this.useFullIndex = false;

                    for (i = 0; i < this.connection; i++) {
                        this.currentSpeed[i] = 0;
                    }

                    this.uploadContent = this.randomString(this.uploadSize);
                    this.uploadStartTime = new Date().getTime();
                    this.uploadTest();

                    for (i = 0; i < this.connection; i++) {
                        this.uploadTestDummy(i);
                    }
                } else {
                    this.uploadSpeed = speed;
                }

            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * Generate random string with given size
     * @param size Size of random string
     * @returns {nothing}
     */
    private randomString(size: number) {
        try {
            let text = '';
            const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

            for (let i = 0; i < size; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            return text;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Log speed test results
     * @returns {nothing}
     */
    private instrumentation() {
        try {
            const finalSpeed = <SpeedTestModel>{
                PingSpeed: this.bestPing,
                DownloadSpeed: this.downloadSpeed,
                UploadSpeed: this.uploadSpeed
            };
            this.speedTestSubject.next(finalSpeed);
        } catch (e) {
            throw e;
        }
    }
}
