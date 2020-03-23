import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ChoiceTextboxForm } from './choice-textbox-form';
import { SuitabilityAnswer } from '../participant-suitability.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-choice-textbox',
  templateUrl: './choice-textbox.component.html'
})
export class ChoiceTextboxComponent implements OnInit, OnDestroy {

  @Input()
  detailsYesText: string;

  @Input()
  hintText: string;

  @Input()
  buttonText = 'Continue';

  @Input()
  suitabilityAnswer: SuitabilityAnswer;

  @Input()
  errorMessage1: string;

  @Input()
  errorMessage2: string;

  @Output()
  submitted = new EventEmitter();

  readonly form = new ChoiceTextboxForm();

  $formSubscription: Subscription;

  ngOnInit() {
    this.$formSubscription = this.form.submitted.subscribe(() => this.onSubmitted());
    this.form.choice.setValue(this.suitabilityAnswer.answer);
    this.form.textInput.setValue(this.suitabilityAnswer.notes);
  }

  protected onSubmitted(): void {
    this.suitabilityAnswer.answer = this.form.choice.value;
    this.suitabilityAnswer.notes = this.form.choice.value ? this.form.textInput.value : null;
    this.submitted.emit();
  }

  ngOnDestroy() {
    this.$formSubscription.unsubscribe();
    this.form.closeSubcriptions();
  }
}
