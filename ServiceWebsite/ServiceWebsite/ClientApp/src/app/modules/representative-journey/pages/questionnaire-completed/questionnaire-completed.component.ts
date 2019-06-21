import { Component } from '@angular/core';
import { RepresentativeBaseComponent } from '../representative-base-component/representative-base.component';
import { HasAccessToCamera } from '../../../base-journey/participant-suitability.model';
import { PrintService } from '../../../../services/print.service';
import { RepresentativeJourney } from '../../representative-journey';
import { RepresentativeQuestionKeys as Keys } from '../../services/representative-model-mapper';


@Component({
  selector: 'app-questionnaire-completed',
  templateUrl: './questionnaire-completed.component.html',
  styleUrls: ['./questionnaire-completed.component.css']
})

export class QuestionnaireCompletedComponent extends RepresentativeBaseComponent {
  private hasCameraDescriptionMap = new Map<HasAccessToCamera, string>([
    [HasAccessToCamera.Yes, 'Yes'],
    [HasAccessToCamera.No, 'No'],
    [HasAccessToCamera.NotSure, 'I\'m not sure']
  ]);

  constructor(journey: RepresentativeJourney, private printService: PrintService) {
    super(journey);
  }

  getCameraAnswer(): string {
    const enumMappedValue = this.hasCameraDescriptionMap.get(this.model.camera);

    return enumMappedValue === undefined ? HasAccessToCamera[this.model.camera] : enumMappedValue;
  }

  print(): boolean {
    this.printService.print();
    return false;
  }

  get keys(): any {
    return Keys;
  }

}

