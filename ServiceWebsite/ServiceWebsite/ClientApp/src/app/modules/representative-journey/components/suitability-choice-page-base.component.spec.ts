import { ComponentFixture } from '@angular/core/testing';
import { ConfigureTestBedFor } from '../../representative-journey/pages/representative-base-component/component-test-bed.spec';
import { Type } from '@angular/core';
import { SuitabilityChoicePageBaseComponent } from './suitability-choice-page-base.component';
import {
  SuitabilityChoicePageBaseFixture,
  SuitabilityChoiceComponentFixture,
  ChoicePageTests
} from '../../base-journey/components/suitability-choice-page-base.component.spec';

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
const cannotProceedUntilChoiceIsSelected =
  <T extends SuitabilityChoicePageBaseComponent>(component: Type<T>):
    ComponentFixture<T> => {
      const fixture = configureTestBedFor(component);
      const choiceComponentFixture = new SuitabilityChoiceComponentFixture(fixture.fixture);
      new ChoicePageTests(choiceComponentFixture, fixture.component).cannotProceedUntilChoiceIsSelected();
      return fixture.fixture;
  };

export {
  cannotProceedUntilChoiceIsSelected as CannotProceeedUntilChoiceIsSelected
};
