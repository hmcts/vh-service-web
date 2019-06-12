import {Component} from '@angular/core';
import {RepresentativeBaseComponent} from '../representative-base-component/representative-base.component';
import {HasAccessToCamera} from '../../../base-journey/participant-suitability.model';

@Component({
  selector: 'app-questionnaire-completed',
  templateUrl: './questionnaire-completed.component.html',
  styleUrls: ['./questionnaire-completed.component.css']
})
export class QuestionnaireCompletedComponent extends RepresentativeBaseComponent {
  GetCameraAnswer(): boolean {
    return this.model.camera === HasAccessToCamera.Yes;
  }
}

