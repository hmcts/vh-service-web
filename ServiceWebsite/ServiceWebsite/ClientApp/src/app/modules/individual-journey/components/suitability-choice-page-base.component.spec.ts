import { ComponentFixture } from '@angular/core/testing';
import { ConfigureTestBedFor } from '../pages/individual-base-component/component-test-bed.spec';
import { SuitabilityChoicePageBaseComponent } from './suitability-choice-page-base.component';
import { Type, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

class SuitabilityChoicePageBaseFixture<T extends SuitabilityChoicePageBaseComponent> {
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

const configureTestBedFor = <T extends SuitabilityChoicePageBaseComponent>
  (component: Type<T>, customiseConfiguration?: Function): SuitabilityChoicePageBaseFixture<T> => {
  const fixture = ConfigureTestBedFor(component, customiseConfiguration);
  return new SuitabilityChoicePageBaseFixture(fixture);
};

/**
 * Base test for any yes/no true/false radio button screen
 * Tests so that the html is bound in such a way that the user cannot proceed before selecting one choice.
 * Generalising the test in one place such as with this, allows us to ensure that all pages follow a similar pattern.
 * @param component The component to be tested.
 */
const cannotProceedUntilChoiceIsSelected = <T extends SuitabilityChoicePageBaseComponent>(component: Type<T>):
  SuitabilityChoicePageBaseFixture<T> => {
  const fixture = configureTestBedFor(component);

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
  configureTestBedFor as ConfigureTestBedForPageComponent,
  SuitabilityChoicePageBaseFixture,
  cannotProceedUntilChoiceIsSelected as CannotProceeedUntilChoiceIsSelected
};
