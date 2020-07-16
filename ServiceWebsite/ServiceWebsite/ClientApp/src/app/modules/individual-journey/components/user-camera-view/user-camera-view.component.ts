import { Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-user-camera-view',
  templateUrl: './user-camera-view.component.html',
  styleUrls: ['./user-camera-view.component.css']
})
export class UserCameraViewComponent implements OnDestroy {

  @ViewChild('videoBox', { static: true })
  videoBox: ElementRef;

  stream: MediaStream;

  setSource(stream: MediaStream) {
    this.stream = stream;
    if (typeof (this.videoBox.nativeElement.srcObject) !== 'undefined') {
      this.videoBox.nativeElement.srcObject = this.stream;
    } else {
      this.videoBox.nativeElement.src = URL.createObjectURL(this.stream);
    }
    this.videoBox.nativeElement.muted = true;
  }

  ngOnDestroy() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    if (this.videoBox.nativeElement.srcObject) {
      this.videoBox.nativeElement.srcObject = null;
    } else {
      this.videoBox.nativeElement.src = '';
    }
  }
}

