import { RepresentativeJourneyComponentTestBed } from '../representative-base-component/representative-journey-component-test-bed.spec';
import { HearingSuitabilityComponent } from './hearing-suitability.component';
import { SuitabilityChoiceComponentFixture } from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';

describe('HearingSuitabilityComponent', () => {
  let fixture: SuitabilityChoiceComponentFixture;
  let component: HearingSuitabilityComponent;

  beforeEach(() => {
    const componentFixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: HearingSuitabilityComponent
    });
    fixture = new SuitabilityChoiceComponentFixture(componentFixture);
    component = componentFixture.componentInstance;
    fixture.detectChanges();
  });

  it('cannot proceed to next step before selecting a choice', () => {
    // when
    fixture.submitIsClicked();

    // then
    expect(component.form.isFormInvalid).toBeTruthy();

    // expect form to display error class
    const formContainer = fixture.debugElementByCss('#form-container');
    expect(formContainer.classes['govuk-form-group--error']).toBeTruthy();

    // and error message to be displayed
    const errorMessage = fixture.debugElementByCss('#form-container .govuk-error-message');
    expect(errorMessage.nativeElement).toBeTruthy();
  });

  it('should clear error when selecting no', () => {
    fixture.submitIsClicked();
    fixture.radioBoxIsClicked('#choice-no');
    expect(component.form.isFormInvalid).toBeFalsy();
  });

  it('should clear error when selecting yes after having submitted', () => {
    fixture.submitIsClicked();
    fixture.radioBoxIsClicked('#choice-yes');
    expect(component.form.isFormInvalid).toBeFalsy();
  });

  it('should display text field when selecting yes', () => {
    fixture.radioBoxIsClicked('#choice-yes');
    expect(component.form.isFormInvalid).toBeFalsy();
  });

  it('should be invalid if submitting without having entered any text', () => {
    // when
    fixture.radioBoxIsClicked('#choice-yes');
    fixture.submitIsClicked();

    // then
    expect(component.form.isFormInvalid).toBeTruthy();
    const textfield = fixture.debugElementByCss('#details-yes');
    expect(textfield.classes['govuk-textarea--error']).toBeTruthy();
  });

  it('should bind value and notes to model on submit', () => {
    // when
    fixture.radioBoxIsClicked('#choice-yes');
    component.form.textInput.setValue('notes');
    fixture.detectChanges();
    fixture.submitIsClicked();

    // then
    expect(component.journey.model.hearingSuitability.answer).toBe(true);
    expect(component.journey.model.hearingSuitability.notes).toBe('notes');
  });

  it('should bind notes as null on selecting no', () => {
    // when
    fixture.radioBoxIsClicked('#choice-no');
    fixture.detectChanges();
    fixture.submitIsClicked();

    // then
    expect(component.journey.model.hearingSuitability.answer).toBe(false);
    expect(component.journey.model.hearingSuitability.notes).toBeNull();
  });
});
