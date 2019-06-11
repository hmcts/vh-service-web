import { ConfigureTestBedFor } from '../pages/individual-base-component/individual-component-test-bed.spec';
import { Type } from '@angular/core';
import { SuitabilityChoicePageBaseComponent } from './suitability-choice-page-base.component';
import {
  CannotProceeedUntilChoiceIsSelected as cannotProceedUntilChoiceIsSelectedBase,
  SuitabilityChoicePageBaseFixture
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
  <T extends SuitabilityChoicePageBaseComponent>(component: Type<T>, customiseConfiguration?: Function):
    SuitabilityChoicePageBaseFixture<T> => {
    const fixture = configureTestBedFor(component, customiseConfiguration);
    return cannotProceedUntilChoiceIsSelectedBase(fixture, component);
  };

export {
  configureTestBedFor as ConfigureTestBedForPageComponent,
  SuitabilityChoicePageBaseFixture,
  cannotProceedUntilChoiceIsSelected as CannotProceeedUntilChoiceIsSelected
};
