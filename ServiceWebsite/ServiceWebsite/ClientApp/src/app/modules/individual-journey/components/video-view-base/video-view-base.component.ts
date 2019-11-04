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
    //this.videoSource = this.videoUrlService.getVideoFileUrl(this.videoFile);
    const currentMovie = '//vhcoreinfratest1-ukwe1.streaming.media.azure.net/5b20f544-272c-45a1-a7b6-52b03e99abae/btd_individual_laptop.ism/manifest';
    this.videoSource = currentMovie;
    console.log(this.videoSource);
  }

  videoLoaded() {
    this.disabledReplay = false;
  }

  async replay() {
    await this.videoViewComponent.play();
  }
}
