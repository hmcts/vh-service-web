import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.css']
})
export class AccessibilityComponent implements AfterViewInit {

  srcLama = '//amssamples.streaming.mediaservices.windows.net/634cd01c-6822-4630-8444-8dd6279f94c6/CaminandesLlamaDrama4K.ism';
  srcEx1 = "//amssamples.streaming.mediaservices.windows.net/91492735-c523-432b-ba01-faba6c2206a2/AzureMediaServicesPromo.ism/manifest";

  srcVideo = '//vhcoreinfratest1-ukwe1.streaming.media.azure.net/5b20f544-272c-45a1-a7b6-52b03e99abae/btd_individual_laptop.ism/manifest';
  srcCourt = '//vhcoreinfratest1-ukwe1.streaming.media.azure.net/41da90e5-8689-4ffb-b86d-616d0a71c5e9/btd_court.ism/manifest';

  srcMp4 = '//vhcoreinfrapreview.blob.core.windows.net/video/btd_court.mp4';
  captionFile = '//vhcoreinfratest1-ukwe1.streaming.media.azure.net/5b20f544-272c-45a1-a7b6-52b03e99abae/btd_individual_laptop.mp4.ttml';


  @ViewChild('videoazp', { static: true }) videoPlayer;

  isVisibleContents = true;
  isFooter = false;
  constructor() {

  } i
  ngAfterViewInit() {
    const myOptions = {
      'nativeControlsForTouch': false,
      controls: true,
      autoplay: true,
      width: "640",
      height: "400",
      id: 'vh-vd1',
      logo: { enabled: true },
    };
    var myPlayer = amp(this.videoPlayer.nativeElement, myOptions);
    myPlayer.src([
      {
        type: 'application/vnd.ms-sstr+xml',
        //  type:'application/dash+xml',
        src: this.srcMp4,
      }
    ]);

  }
  goToDiv(fragment: string): void {
    window.document.getElementById(fragment).scrollIntoView();
  }

  scrollHandler(e) {
    this.isVisibleContents = e.makeVisible;
  }

  scrollFooter(e) {
    this.isFooter = !e.footer;
  }

}
