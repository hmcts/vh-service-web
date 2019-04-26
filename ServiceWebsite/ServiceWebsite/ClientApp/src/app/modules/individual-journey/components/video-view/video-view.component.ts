import { Component, Output, Input, ElementRef, ViewChild , EventEmitter} from '@angular/core';
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
export class VideoViewComponent {
  @Output()
  loaded: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  source: string; 

  @ViewChild('video')
  videoElement: ElementRef;
  
  /**
   * This method is invoked when a video is ready to start playing
   */
  readyToPlay()
  {
    this.loaded.emit();
  }

  /**
   * Plays the video
   */
  play(){
    this.videoElement.nativeElement.play();
  }
}
