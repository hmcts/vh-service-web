import { Injectable, ViewChild, OnInit } from '@angular/core';
import { VideoViewComponent } from '../video-view/video-view.component';
import { VideoUrlService } from '../../services/video-url.service';
import { VideoFiles } from '../../services/video-files';

@Injectable()
export class VideoViewBaseComponent implements OnInit {

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

  replay() {
    this.videoViewComponent.play();
  }
}
