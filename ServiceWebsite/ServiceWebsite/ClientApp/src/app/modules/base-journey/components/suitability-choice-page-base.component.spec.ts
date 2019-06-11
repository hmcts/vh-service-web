import { ComponentFixture } from '@angular/core/testing';
import { Type, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SuitabilityChoicePageBaseComponent } from './suitability-choice-page-base.component';
import { JourneyBase } from '../journey-base';

class SuitabilityChoicePageBaseFixture
  <T extends SuitabilityChoicePageBaseComponent<JourneyBase>> {
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

// export class SuitabilityChoiceTestCases {
//   cannotProceedUntilChoiceIsSelected<T>(fixture: ComponentFixture<T>) {
    
//   }
// }


/**
 * Base test for any yes/no true/false radio button screen
 * Tests so that the html is bound in such a way that the user cannot proceed before selecting one choice.
 * Generalising the test in one place such as with this, allows us to ensure that all pages follow a similar pattern.
 * @param component The component to be tested.
 */
const cannotProceedUntilChoiceIsSelected =
  <T extends SuitabilityChoicePageBaseComponent<JourneyBase>>(fixture: SuitabilityChoicePageBaseFixture<T>,
    component: Type<T>, customiseConfiguration?: Function):
    SuitabilityChoicePageBaseFixture<T> => {
    // when
    fixture.submitIsClicked();

    // then
    expect(fixture.component.isFormInvalid).toBeTruthy();

    // expect form to be erronous
    const formContainer = fixture.debugElementByCss('#form-container');
    expect(formContainer.classes['govuk-form-group--error']).toBeTruthy();

    // and error message to be displayed
    const errorMessage = fixture.debugElementByCss('#error-message');
    expect(errorMessage.nativeElement).toBeTruthy();

    // when selecting a radio button
    fixture.radioBoxIsClicked('#choice-yes');

    // then
    fixture.submitIsClicked();

    return fixture;
  };

export {
  SuitabilityChoicePageBaseFixture,
  cannotProceedUntilChoiceIsSelected as CannotProceeedUntilChoiceIsSelected
};