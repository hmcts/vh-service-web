import {
    ChoiceFormComponent,
    SuitabilityChoiceComponentFixture,
    ChoicePageTests,
    HasChoiceFormComponent
} from './suitability-choice-component-fixture.spec';
import { ComponentFixture } from '@angular/core/testing';

class HasChoiceFormWrapper implements ChoiceFormComponent {
    constructor(private component: HasChoiceFormComponent) {}

    get isFormInvalid(): boolean {
        return this.component.form.isFormInvalid;
    }
}

export class CommonTests {
    static cannotProceedUntilChoiceIsSelected<T extends ChoiceFormComponent>(fixture: ComponentFixture<T>): void {
        const choiceComponentFixture = new SuitabilityChoiceComponentFixture(fixture);
        new ChoicePageTests(choiceComponentFixture, fixture.componentInstance).cannotProceedUntilChoiceIsSelected();
    }

    static hasErrorUntilChoiceIsSelected<T extends HasChoiceFormComponent>(fixture: ComponentFixture<T>): void {
        const choiceComponentFixture = new SuitabilityChoiceComponentFixture(fixture);
        new ChoicePageTests(choiceComponentFixture, new HasChoiceFormWrapper(fixture.componentInstance))
            .cannotProceedUntilChoiceIsSelected();
    }
}
