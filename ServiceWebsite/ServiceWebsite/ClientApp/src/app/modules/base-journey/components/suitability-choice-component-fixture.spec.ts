import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export interface FixtureMethods {
  debugElement: DebugElement;
  detectChanges(): void;
}

export interface ChoiceFormComponent {
  readonly isFormInvalid: boolean;
}

export class ContinuableComponentFixture {
  constructor(private fixture: FixtureMethods) {}

  debugElementByCss(css: string): DebugElement {
    return this.fixture.debugElement.query(By.css(css));
  }

  submitIsClicked() {
    const continueButton = this.debugElementByCss('.govuk-button');
    continueButton.nativeElement.click();
    this.fixture.detectChanges();
  }
}

export class SuitabilityChoiceComponentFixture {
  constructor(private fixture: FixtureMethods) {}

  detectChanges(): void {
    this.fixture.detectChanges();
  }

  radioBoxIsClicked(id: string) {
    const radioButton = this.debugElementByCss(id);
    radioButton.nativeElement.click();
    this.fixture.detectChanges();
  }

  submitIsClicked() {
    new ContinuableComponentFixture(this.fixture).submitIsClicked();
  }

  debugElementByCss(css: string): DebugElement {
    return this.fixture.debugElement.query(By.css(css));
  }
}

export class ChoicePageTests {
  constructor(
    private fixture: SuitabilityChoiceComponentFixture,
    private component: ChoiceFormComponent
  ) {}

  cannotProceedUntilChoiceIsSelected(): void {
    // when
    this.fixture.submitIsClicked();

    // then
    expect(this.component.isFormInvalid).toBeTruthy();

    // expect form to be erronous
    const formContainer = this.fixture.debugElementByCss('#form-container');
    expect(formContainer.classes['govuk-form-group--error']).toBeTruthy();

    // and error message to be displayed
    const errorMessage = this.fixture.debugElementByCss('#error-message');
    expect(errorMessage.nativeElement).toBeTruthy();

    // when selecting a radio button
    this.fixture.radioBoxIsClicked('#choice-yes');

    // then
    this.fixture.submitIsClicked();
  }
}
