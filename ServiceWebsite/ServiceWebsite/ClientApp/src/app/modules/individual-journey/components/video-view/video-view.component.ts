import { Component, Output, Input, ElementRef, ViewChild, EventEmitter, OnDestroy } from '@angular/core';
import { Logger } from 'src/app/services/logger';
/*
Muted videos can autoplay in Chrome. Autoplay with sound is allowed if:
  1)User has interacted with the domain (click, tap, etc.).
  2)On desktop, the user's Media Engagement Index threshold has been crossed,
  meaning the user has previously play video with sound.
  3)On mobile, the user has [added the site to their home screen].
 */
@Component({
    selector: 'app-video-view',
    templateUrl: './video-view.component.html',
    styles: []
})
export class VideoViewComponent implements OnDestroy {
    constructor(private logger: Logger) {
    }

  //from the doc example
  //currentMovie = 'https://amssamples.streaming.mediaservices.windows.net/3b970ae0-39d5-44bd-b3a3-3136143d6435/AzureMediaServicesPromo.ism/manifest';

  //url from the azure media service
  currentMovie = 'http://vhcoreinfratest1-ukwe1.streaming.media.azure.net/5b20f544-272c-45a1-a7b6-52b03e99abae/btd_individual_laptop.ism/manifest';

  @Output()
    loaded: EventEmitter<any> = new EventEmitter<any>();

    @Input()
    source: string;

    @ViewChild('video', { static: false })
    videoElement: ElementRef;

    videoUnavailable: boolean;
    /**
     * This method is invoked when a video is ready to start playing
     */
    readyToPlay() {
        this.loaded.emit();
    }

    onVideoError(): void {
        this.videoUnavailable = true;
        this.logger.error('The video file is not available.', null, null);
    }
    /**
     * Plays the video
     */
    async play() {
        this.stopPlaying();
        this.videoTag.muted = false;
        await this.videoTag.play();
    }

    private get videoTag() {
        const video: HTMLVideoElement = this.videoElement.nativeElement;
        return video;
    }

    private stopPlaying() {
        const videoElement = this.videoTag;
        videoElement.pause();
        videoElement.currentTime = 0;
        videoElement.muted = true;
    }

    ngOnDestroy() {
        this.stopPlaying();
    }
}
