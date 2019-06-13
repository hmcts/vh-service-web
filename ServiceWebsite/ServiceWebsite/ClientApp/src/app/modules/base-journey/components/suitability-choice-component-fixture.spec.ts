import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';

export interface FixtureMethods {
  debugElement: DebugElement;
  detectChanges(): void;
}

export interface ChoiceFormComponent {
  readonly isFormInvalid: boolean;
}

export class SuitabilityChoiceComponentFixture  {
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
    const continueButton = this.debugElementByCss('.govuk-button');
    continueButton.nativeElement.click();
    this.fixture.detectChanges();
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

export class CommonTests {
  static cannotProceedUntilChoiceIsSelected<T extends ChoiceFormComponent>(fixture: ComponentFixture<T>): void {
    const choiceComponentFixture = new SuitabilityChoiceComponentFixture(fixture);
    new ChoicePageTests(choiceComponentFixture, fixture.componentInstance).cannotProceedUntilChoiceIsSelected();
  }
}
