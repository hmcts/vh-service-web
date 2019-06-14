import {
    ChoiceFormComponent,
    SuitabilityChoiceComponentFixture,
    ChoicePageTests
} from './suitability-choice-component-fixture.spec';
import { ComponentFixture } from '@angular/core/testing';

export class CommonTests {
    static cannotProceedUntilChoiceIsSelected<T extends ChoiceFormComponent>(fixture: ComponentFixture<T>): void {
        const choiceComponentFixture = new SuitabilityChoiceComponentFixture(fixture);
        new ChoicePageTests(choiceComponentFixture, fixture.componentInstance).cannotProceedUntilChoiceIsSelected();
    }
}
