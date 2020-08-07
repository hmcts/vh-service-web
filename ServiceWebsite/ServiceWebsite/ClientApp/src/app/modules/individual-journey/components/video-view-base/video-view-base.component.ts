import { Injectable, ViewChild, OnInit, Directive } from '@angular/core';
import { VideoViewComponent } from '../video-view/video-view.component';
import { VideoUrlService } from '../../services/video-url.service';
import { VideoFiles } from '../../services/video-files';

@Directive()
@Injectable()
export class VideoViewBaseComponentDirective implements OnInit {

  constructor(private videoUrlService: VideoUrlService,
    private videoFile: VideoFiles) {
  }

  @ViewChild(VideoViewComponent, { static: true })
  videoViewComponent: VideoViewComponent;

  videoSource: string;
  disabledReplay = true;

  ngOnInit() {
    this.videoSource = this.videoUrlService.getVideoFileUrl(this.videoFile);
  }

  videoLoaded() {
    this.disabledReplay = false;
  }

  async replay() {
    await this.videoViewComponent.play();
  }
}
