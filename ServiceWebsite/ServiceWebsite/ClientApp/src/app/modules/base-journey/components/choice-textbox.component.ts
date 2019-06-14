import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ChoiceTextboxForm } from './choice-textbox-form';
import { SuitabilityAnswer } from '../participant-suitability.model';

@Component({
    selector: 'app-choice-textbox',
    templateUrl: './choice-textbox.component.html'
  })
  export class ChoiceTextboxComponent implements OnInit {

    @Input()
    suitabilityAnswer: SuitabilityAnswer;

    @Output()
    submitted = new EventEmitter();

    readonly form = new ChoiceTextboxForm();

    ngOnInit() {
      this.form.submitted.subscribe(() => this.onSubmitted());
      this.form.choice.setValue(this.suitabilityAnswer.answer);
      this.form.textInput.setValue(this.suitabilityAnswer.notes);
    }

    protected onSubmitted(): void {
      this.suitabilityAnswer.answer = this.form.choice.value;
      this.suitabilityAnswer.notes = this.form.choice.value ? this.form.textInput.value : null;
      this.submitted.emit();
    }
  }
