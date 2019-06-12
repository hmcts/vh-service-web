import { ComponentFixture } from '@angular/core/testing';
import { IndividualJourneyComponentTestBed } from '../pages/individual-base-component/individual-component-test-bed.spec';
import { Type } from '@angular/core';
import { SuitabilityChoicePageBaseComponent } from './suitability-choice-page-base.component';
import {
  SuitabilityChoiceComponentFixture,
  ChoicePageTests
} from '../../base-journey/components/suitability-choice-component-fixture.spec';

/**
 * Base test for any yes/no true/false radio button screen
 * Tests so that the html is bound in such a way that the user cannot proceed before selecting one choice.
 * Generalising the test in one place such as with this, allows us to ensure that all pages follow a similar pattern.
 * @param component The component to be tested.
 */
const cannotProceedUntilChoiceIsSelected =
  <T extends SuitabilityChoicePageBaseComponent>(component: Type<T>):
    ComponentFixture<T> => {
    const fixture = IndividualJourneyComponentTestBed.createComponent({component: component});
    const choiceComponentFixture = new SuitabilityChoiceComponentFixture(fixture);
    new ChoicePageTests(choiceComponentFixture, fixture.componentInstance).cannotProceedUntilChoiceIsSelected();
    return fixture;
  };

export {
  cannotProceedUntilChoiceIsSelected as CannotProceeedUntilChoiceIsSelected
};
