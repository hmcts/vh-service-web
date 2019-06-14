import { SuitabilityChoiceComponentFixture } from '../../../base-journey/components/suitability-choice-component-fixture.spec';
import { AboutYourClientComponent } from './about-your-client.component';
import { RepresentativeJourneyComponentTestBed } from '../representative-base-component/representative-journey-component-test-bed.spec';

describe('AboutYourClientComponent', () => {
  let fixture: SuitabilityChoiceComponentFixture;
  let component: AboutYourClientComponent;

  beforeEach(() => {
    const componentFixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: AboutYourClientComponent
    });
    component = componentFixture.componentInstance;
    fixture = new SuitabilityChoiceComponentFixture(componentFixture);
    fixture.detectChanges();
  });

  it('cannot proceed to next step before selecting a choice', () => {
    // when
    fixture.submitIsClicked();

    // then
    expect(component.isFormInvalid).toBeTruthy();

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
    expect(component.isFormInvalid).toBeFalsy();
  });

  it('should clear error when selecting yes after having submitted', () => {
    fixture.submitIsClicked();
    fixture.radioBoxIsClicked('#choice-yes');
    expect(component.isFormInvalid).toBeFalsy();
  });

  it('should display text field when selecting yes', () => {
    fixture.radioBoxIsClicked('#choice-yes');
    expect(component.isFormInvalid).toBeFalsy();
  });

  it('should be invalid if submitting without having entered any text', () => {
    // when
    fixture.radioBoxIsClicked('#choice-yes');
    fixture.submitIsClicked();

    // then
    expect(component.isFormInvalid).toBeTruthy();
    const textfield = fixture.debugElementByCss('#details-yes');
    expect(textfield.classes['govuk-textarea--error']).toBeTruthy();
  });

  it('should bind value and notes to model on submit', () => {
    // when
    fixture.radioBoxIsClicked('#choice-yes');
    component.textInput.setValue('notes');
    fixture.detectChanges();
    fixture.submitIsClicked();

    // then
    expect(component.journey.model.aboutYourClient.answer).toBe(true);
    expect(component.journey.model.aboutYourClient.notes).toBe('notes');
  });

  it('should bind notes as null on selecting no', () => {
    // when
    fixture.radioBoxIsClicked('#choice-no');
    fixture.detectChanges();
    fixture.submitIsClicked();

    // then
    expect(component.journey.model.aboutYourClient.answer).toBe(false);
    expect(component.journey.model.aboutYourClient.notes).toBeNull();
  });
});
