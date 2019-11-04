import { Component, Output, Input, AfterContentInit, ElementRef, ViewChild, EventEmitter, OnDestroy } from '@angular/core';
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
export class VideoViewComponent implements AfterContentInit, OnDestroy {
    constructor(private logger: Logger) {
    }

  //from the doc example
 // currentMovie = 'https://amssamples.streaming.mediaservices.windows.net/3b970ae0-39d5-44bd-b3a3-3136143d6435/AzureMediaServicesPromo.ism/manifest';

  //url from the azure media service
  //currentMovie = 'https://vhcoreinfratest1-ukwe1.streaming.media.azure.net/5b20f544-272c-45a1-a7b6-52b03e99abae/btd_court.ism/manifest';

  // = 'https://vhcoreinfratest1-ukwe1.streaming.media.azure.net/5b20f544-272c-45a1-a7b6-52b03e99abae/btd_individual_laptop.ism/manifest';
 // captionFile = 'http://vhcoreinfratest1-ukwe1.streaming.media.azure.net/5b20f544-272c-45a1-a7b6-52b03e99abae/btd_individual_laptop.mp4.ttml';
  
  @Output()
    loaded: EventEmitter<any> = new EventEmitter<any>();

    @Input()
    source: string;

  @ViewChild('videoElement', { static: false })
    videoElement: ElementRef;

  videoUnavailable: boolean;

  ngAfterContentInit() {
    setTimeout(() => {
      var myPlayer = amp(this.videoElement.nativeElement);
      console.log(myPlayer.currentTechName(), 'texhname');
      myPlayer.autoplay(true);
      myPlayer.controls(true);
      myPlayer.src({
        type: "application/dash+xml",
        src: this.source,
      });
    }, 1000);
    
  }

  playAZP() {
    var myPlayer = amp(this.videoElement.nativeElement);
    console.log(myPlayer.currentTechName(), 'texhname');
    myPlayer.autoplay(true);
    myPlayer.controls(true);
    //myPlayer.src({
    //  type: "application/dash+xml",
    //  src: this.source + '(format=mpd-time-csf)',
    //}); 
  }

  xxngOnInit() {
    const myOptions = {
      nativeControlsForTouch: false,
      controls: true,
      autoplay: true,
      width: "640",
      height: "400",
      id: "vh-vd1",
      logo: { enabled: true },
    };
    setTimeout(() => {
      var myPlayer = amp(this.videoElement.nativeElement, myOptions,
        function () {
          console.log('It is playing');
        });
      myPlayer.src({
        type: "application/dash+xml",
        src: this.source
      });

      myPlayer.addEventListener('error', function () {
        var errorDetails = myPlayer.error();
        // var code = errorDetails.code;
        var message = errorDetails.message;
        console.log('ERROR: ' + message);
      });

      //amp(this.videoElement.nativeElement).ready(function () {
      //  //Start playing the video.
      //  console.log('It is playing');
      //  myPlayer.play();
      //});

      //if (myPlayer.error().code & amp.errorCode.abortedErrStart) {
      //  // MEDIA_ERR_ABORTED errors
      //  console.log('MEDIA_ERR_ABORTED errors');
      //}
      //else if (myPlayer.error().code & amp.errorCode.networkErrStart) {
      //  // MEDIA_ERR_NETWORK errors
      //  console.log('MEDIA_ERR_NETWORK errors');
      //}
      //else if (myPlayer.error().code & amp.errorCode.decodeErrStart) {
      //  // MEDIA_ERR_DECODE errors
      //  console.log('MEDIA_ERR_DECODE errors');
      //}
      //else if (myPlayer.error().code & amp.errorCode.srcErrStart) {
      //  // MEDIA_ERR_SRC_NOT_SUPPORTED errors
      //  console.log(' MEDIA_ERR_SRC_NOT_SUPPORTED errors');
      //}
      //else if (myPlayer.error().code & amp.errorCode.encryptErrStart) {
      //  // MEDIA_ERR_ENCRYPTED errors
      //  console.log('MEDIA_ERR_ENCRYPTED errors');
      //}
      //else if (myPlayer.error().code & amp.errorCode.srcPlayerMismatchStart) {
      //  // SRC_PLAYER_MISMATCH errors
      //  console.log('SRC_PLAYER_MISMATCH errors');
      //}
      //else {
      //  // unknown errors
      //  console.log(' unknown errors');
      //}
     //myPlayer.src([
     //   {
     //     type: "application/vnd.ms-sstr+xml",
     //     src: this.source,
     //   } 
     // ]);
    }, 1000);
    
  }
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
