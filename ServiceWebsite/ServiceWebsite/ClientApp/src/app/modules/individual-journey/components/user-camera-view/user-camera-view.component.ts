import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-camera-view',
  templateUrl: './user-camera-view.component.html',
  styles: []
})
export class UserCameraViewComponent implements OnInit {

  @Input()
  videoWidth: number;

  @ViewChild('#videoBox')
  videoBox: ElementRef;

  stream: MediaStream;

  constructor() { }

  ngOnInit() {
    if (typeof (this.videoBox.nativeElement.srcObject) != "undefined") {
      this.videoBox.nativeElement.srcObject = this.stream;
    }
    else {
      this.videoBox.nativeElement.src = URL.createObjectURL(this.stream);
    }
  }
}
