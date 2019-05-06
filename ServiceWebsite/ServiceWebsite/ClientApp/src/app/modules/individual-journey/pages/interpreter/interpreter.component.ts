import { Component } from '@angular/core';
import { SuitabilityChoicePageBaseComponent } from '../../components/suitability-choice-page-base.component';

@Component({
  selector: 'app-interpreter',
  templateUrl: './interpreter.component.html',
  styles: []
})
export class InterpreterComponent extends SuitabilityChoicePageBaseComponent {
  protected bindModel() {
    this.model.interpreter = this.choice.value;
  }
}
