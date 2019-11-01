import { Component, OnInit, AfterViewInit,NgZone } from '@angular/core';

@Component({
  selector: 'app-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.css']
})
export class AccessibilityComponent implements AfterViewInit{
 //currentMovie = 'https://amssamples.streaming.mediaservices.windows.net/3b970ae0-39d5-44bd-b3a3-3136143d6435/AzureMediaServicesPromo.ism/manifest';
  currentMovie = 'https://amssamples.streaming.mediaservices.windows.net/634cd01c-6822-4630-8444-8dd6279f94c6/CaminandesLlamaDrama4K.ism/manifest';

  //url from the azure media service
  //currentMovie = 'http://vhcoreinfratest1-ukwe1.streaming.media.azure.net/5b20f544-272c-45a1-a7b6-52b03e99abae/btd_individual_laptop.ism/manifest';
  //currentMovie = 'https://vhcoreinfratest1-ukwe1.streaming.media.azure.net/5b20f544-272c-45a1-a7b6-52b03e99abae/btd_court.ism/manifest';

  captionFile = 'http://vhcoreinfratest1-ukwe1.streaming.media.azure.net/5b20f544-272c-45a1-a7b6-52b03e99abae/btd_individual_laptop.mp4.ttml';


  isVisibleContents = true;
  isFooter = false;
  constructor(private _ngZone: NgZone) {
    
  }
  ngAfterViewInit() {
    //const myOptions = {
    //  'nativeControlsForTouch': false,
    //  controls: true,
    //  autoplay: true,
    //  width: "640",
    //  height: "400",
    //};
    //this._ngZone.run(() => {
    //  setTimeout(() => {
    //    const myPlayer = amp('vh-vd1', myOptions);
    //    myPlayer.src([
    //      {
    //        //'src': '//amssamples.streaming.mediaservices.windows.net/634cd01c-6822-4630-8444-8dd6279f94c6/CaminandesLlamaDrama4K.ism/manifest',
    //        'type': 'application/vnd.ms-sstr+xml'
    //      }
    //    ]);
    //  }, 500
    //  )
    //})
    
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
