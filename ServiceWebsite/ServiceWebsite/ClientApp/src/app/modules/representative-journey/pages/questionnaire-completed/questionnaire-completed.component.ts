import { Component } from '@angular/core';
import { HasAccessToCamera } from '../../../base-journey/participant-suitability.model';
import { PrintService } from '../../../../services/print.service';
import { RepresentativeJourney } from '../../representative-journey';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';
import { RepresentativeSuitabilityModel } from '../../representative-suitability.model';

@Component({
  selector: 'app-questionnaire-completed',
  templateUrl: './questionnaire-completed.component.html',
  styleUrls: ['./questionnaire-completed.component.css']
})

export class QuestionnaireCompletedComponent {
  private hasCameraDescriptionMap = new Map<HasAccessToCamera, string>([
    [HasAccessToCamera.Yes, 'Yes'],
    [HasAccessToCamera.No, 'No'],
    [HasAccessToCamera.NotSure, 'I\'m not sure']
  ]);

  constructor(private journey: RepresentativeJourney, private printService: PrintService) {}

  getCameraAnswer(): string {
    const enumMappedValue = this.hasCameraDescriptionMap.get(this.model.camera);

    return enumMappedValue === undefined ? HasAccessToCamera[this.model.camera] : enumMappedValue;
  }

  get model(): RepresentativeSuitabilityModel {
    return this.journey.model;
  }

  print(): boolean {
    this.printService.print();
    return false;
  }

  continue() {
    this.journey.goto(RepresentativeJourneySteps.ThankYou);
  }
}

