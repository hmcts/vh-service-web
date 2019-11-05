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

  ampOptions = {
    'nativeControlsForTouch': false,
    "disableUrlRewriter": true,
    controls: true,
    autoplay: true,
    width: "640",
    height: "400",
    id: 'vh-vd1',
    logo: { enabled: true },
  };

  ampPlayer: any;


  constructor() {

  }

  ngAfterViewInit() {
    
    this.waitForAmp().then((amp) => {
      this.ampPlayer = amp;

      this.ampPlayer.src([{
        src: this.srcVideo,
        type: 'application/vnd.ms-sstr+xml',
        
      }],
        [
          {
            src:
              "https://vhcoreinfratest1.blob.core.windows.net/asset-cbcd4569-3775-4994-91a8-a1e019de17e1/btd_individual_laptop.mp4.vtt?sv=2017-04-17&sr=c&si=e30e8eff-b0bb-435e-b8ce-1a4cefea0cba&sig=jP125rTmY8dV0TjnrMUWoVejrI0qx9TnNdA17PS12mc%3D&st=2019-11-05T10%3A45%3A19Z&se=2119-11-12T10%3A45%3A19Z";
            srclang: "en",
            label: "track1",
            kind: "captions"
          }
        ]
      );
     
      this.videoPlayer.srcObject = this.srcLama;
    }).catch(e => console.error('Could not found Azure Media Player plugin', e));
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

waitForAmp = () => {
    return new Promise((resolve, reject) => {
      let waited = 0;
      const wait = (interval) => {
        setTimeout(() => {
            waited += interval;
          const ampPlayer = amp(this.videoPlayer.nativeElement, this.ampOptions);
          if (ampPlayer !== undefined) {
            return resolve(ampPlayer);
            }
            if (waited >= 30000) {
            return reject();
            }
            wait(interval * 2);
            return null;
        }, interval);
      };
      wait(30);
    });
  }

}
