import { ComponentFixture } from '@angular/core/testing';
import { Type, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SuitabilityChoicePageBaseComponent } from './suitability-choice-page-base.component';
import { JourneyBase } from '../journey-base';

class SuitabilityChoicePageBaseFixture<T> {
  readonly fixture: ComponentFixture<T>;
  readonly component: T;

  constructor(fixture: ComponentFixture<T>) {
    this.fixture = fixture;
    this.component = fixture.componentInstance;
  }

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

export {
  SuitabilityChoicePageBaseFixture,
};
