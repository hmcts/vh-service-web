import { ConfigureTestBedFor } from '../../representative-journey/pages/representative-base-component/component-test-bed.spec';
import { Type } from '@angular/core';
import {
  CannotProceeedUntilTextboxChoiceIsSelected as cannotProceedUntilTextboxChoiceIsSelectedBase,
  SuitabilityChoiceTextboxPageBaseFixture
} from '../../base-journey/components/suitability-choice-page-base.component.spec';
import { SuitabilityChoiceTextboxPageBaseComponent } from './suitability-choice-textbox-page-base.component';
import { JourneyBase } from '../journey-base';

const configureTestBedFor = <T extends SuitabilityChoiceTextboxPageBaseComponent<JourneyBase>>
  (component: Type<T>, customiseConfiguration?: Function): SuitabilityChoiceTextboxPageBaseFixture<T> => {
  const fixture = ConfigureTestBedFor(component, customiseConfiguration);
  return new SuitabilityChoiceTextboxPageBaseFixture(fixture);
};

/**
 * Base test for any yes/no true/false radio button screen
 * Tests so that the html is bound in such a way that the user cannot proceed before selecting one choice.
 * Generalising the test in one place such as with this, allows us to ensure that all pages follow a similar pattern.
 * @param component The component to be tested.
 */
const cannotProceedUntilTextboxChoiceIsSelected =
  <T extends SuitabilityChoiceTextboxPageBaseComponent<JourneyBase>>(component: Type<T>, customiseConfiguration?: Function):
    SuitabilityChoiceTextboxPageBaseFixture<T> => {
    const fixture = configureTestBedFor(component, customiseConfiguration);
    return cannotProceedUntilTextboxChoiceIsSelectedBase(fixture, component);
  };

export {
  configureTestBedFor as ConfigureTestBedForTextboxPageComponent,
  SuitabilityChoiceTextboxPageBaseFixture,
  cannotProceedUntilTextboxChoiceIsSelected as CannotProceeedUntilTextboxChoiceIsSelected
};
