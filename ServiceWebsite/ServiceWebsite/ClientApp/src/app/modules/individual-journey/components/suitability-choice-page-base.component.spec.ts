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

export { configureTestBedFor as ConfigureTestBedForPageComponent, SuitabilityChoicePageBaseFixture };
