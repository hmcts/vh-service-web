import { Component, Output, Input } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styles: []
})
export class VideoViewComponent {
  @Output()
  loaded: EventEmitter;

  @Input()
  source: string;
}
