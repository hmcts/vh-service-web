import { Component } from '@angular/core';
import { IndividualBaseComponent } from '../individual-base-component/individual-base.component';

@Component({
  selector: 'app-participant-view',
  templateUrl: './participant-view.component.html',
  styles: []
})
export class ParticipantViewComponent extends IndividualBaseComponent {
  source: string;
  showVideo : boolean;

  ngOnInit() {
    this.source = 'https://vhcoreinfradev.blob.core.windows.net/video/btd_individual_laptop_large.mp4';
  }

  
}
