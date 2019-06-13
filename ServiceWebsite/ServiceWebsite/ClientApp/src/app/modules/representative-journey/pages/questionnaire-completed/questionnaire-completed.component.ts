import {Component} from '@angular/core';
import {RepresentativeBaseComponent} from '../representative-base-component/representative-base.component';
import {HasAccessToCamera} from '../../../base-journey/participant-suitability.model';

@Component({
  selector: 'app-questionnaire-completed',
  templateUrl: './questionnaire-completed.component.html',
  styleUrls: ['./questionnaire-completed.component.css']
})
export class QuestionnaireCompletedComponent extends RepresentativeBaseComponent {
  private hasCameraDescriptionMap = new Map<HasAccessToCamera, string>([
    [HasAccessToCamera.Yes, 'Yes'],
    [HasAccessToCamera.No, 'No'],
    [HasAccessToCamera.NotSure, 'Not Sure']
  ]);

  GetCameraAnswer(): string {
    const enumMappedValue = this.hasCameraDescriptionMap.get(this.model.camera);

    return enumMappedValue === undefined ? HasAccessToCamera[this.model.camera] : enumMappedValue;
  }
}

