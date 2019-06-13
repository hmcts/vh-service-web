import { SuitabilityChoiceComponentFixture } from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';
import { ChoiceTextboxComponent } from './choice-textbox.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuitabilityAnswer } from '../participant-suitability.model';
import { ReactiveFormsModule } from '@angular/forms';

describe('ChoiceTextboxComponent', () => {
  let component: ChoiceTextboxComponent;
  let fixture: ComponentFixture<ChoiceTextboxComponent>;
  let testFixture: SuitabilityChoiceComponentFixture;
  let answer: SuitabilityAnswer;
  let submitted = false;

  beforeEach(() => {
    answer = new SuitabilityAnswer();

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        ChoiceTextboxComponent
      ]
    });

    fixture = TestBed.createComponent(ChoiceTextboxComponent);
    component = fixture.componentInstance;
    component.suitabilityAnswer = answer;
    component.submitted.subscribe(() => submitted = true);

    fixture.detectChanges();
    component.ngOnInit();

    testFixture = new SuitabilityChoiceComponentFixture(fixture);
  });

  it('cannot proceed to next step before selecting a choice', () => {
    // when
    testFixture.submitIsClicked();

    // then
    expect(component.form.isFormInvalid).toBeTruthy();

    // expect form to display error class
    const formContainer = testFixture.debugElementByCss('#form-container');
    expect(formContainer.classes['govuk-form-group--error']).toBeTruthy();

    // and error message to be displayed
    const errorMessage = testFixture.debugElementByCss('#form-container .govuk-error-message');
    expect(errorMessage.nativeElement).toBeTruthy();
  });

  it('should clear error when selecting no', () => {
    testFixture.submitIsClicked();
    testFixture.radioBoxIsClicked('#choice-no');
    expect(component.form.isFormInvalid).toBeFalsy();
  });

  it('should clear error when selecting yes after having submitted', () => {
    testFixture.submitIsClicked();
    testFixture.radioBoxIsClicked('#choice-yes');
    expect(component.form.isFormInvalid).toBeFalsy();
  });

  it('should display text field when selecting yes', () => {
    testFixture.radioBoxIsClicked('#choice-yes');
    expect(component.form.isFormInvalid).toBeFalsy();
  });

  it('should be invalid if submitting without having entered any text', () => {
    // when
    testFixture.radioBoxIsClicked('#choice-yes');
    testFixture.submitIsClicked();

    // then
    expect(component.form.isFormInvalid).toBeTruthy();
    const textfield = testFixture.debugElementByCss('#details');
    expect(textfield.classes['govuk-textarea--error']).toBeTruthy();
  });

  it('should bind value and notes to model on submit', () => {
    // when
    testFixture.radioBoxIsClicked('#choice-yes');
    component.form.textInput.setValue('notes');
    testFixture.detectChanges();
    testFixture.submitIsClicked();

    // then
    expect(answer.answer).toBe(true);
    expect(answer.notes).toBe('notes');
  });

  it('should bind notes as null on selecting no', () => {
    // when
    testFixture.radioBoxIsClicked('#choice-no');
    testFixture.detectChanges();
    testFixture.submitIsClicked();

    // then
    expect(answer.answer).toBe(false);
    expect(answer.notes).toBeNull();
  });
});
