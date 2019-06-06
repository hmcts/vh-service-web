import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ValidateForWhiteSpace } from 'src/app/modules/shared/validators/whitespace-validator';
import { SuitabilityChoiceTextboxPageBaseComponent } from '../../components/suitability-choice-textbox-page-base.component';
import { RepresentativeJourney } from '../../representative-journey';

@Component({
  selector: 'app-about-your-client',
  templateUrl: './about-your-client.component.html',
  styles: []
})
export class AboutYourClientComponent
  extends SuitabilityChoiceTextboxPageBaseComponent<RepresentativeJourney> implements OnInit {

  ngOnInit() {
    this.choice.setValue(this.model.aboutYourClient.answer);
    this.textInput.setValue(this.model.aboutYourClient.notes);
    super.ngOnInit();
  }

  protected bindModel(): void {
    this.model.aboutYourClient.answer = this.choice.value;
    this.model.aboutYourClient.notes = this.choice.value ? this.textInput.value : null;
  }
}
