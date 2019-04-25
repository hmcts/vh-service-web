import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { IndividualBaseComponent } from '../individual-base-component/individual-base.component';

@Component({
  selector: 'app-participant-view',
  templateUrl: './participant-view.component.html',
})
export class ParticipantViewComponent extends IndividualBaseComponent {
  stream: MediaStream;

  @ViewChild("testVideoBox")
  testVideoBox: ElementRef;

  constructor(private mediaService: MediaService) {
    super();
  }

  ngOnInit() {
    this.mediaService.getStream().then(s => {
      this.stream = s;
      if (typeof(this.testVideoBox.nativeElement.srcObject) != "undefined") {
        this.testVideoBox.nativeElement.srcObject = s;
      }
      else {
        this.testVideoBox.nativeElement.src = URL.createObjectURL(s);
      }
    })
      .catch(error => console.log('Error' + error));
  }

  continue() {

  }
}
