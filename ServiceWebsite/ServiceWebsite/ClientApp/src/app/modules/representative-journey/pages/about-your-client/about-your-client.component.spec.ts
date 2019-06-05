import { AboutYourClientComponent } from './about-your-client.component';
import {
  ConfigureTestBedForPageComponent,
  SuitabilityChoicePageBaseFixture
} from '../../components/suitability-choice-page-base.component.spec';

describe('AboutYourClientComponent', () => {
  let fixture: SuitabilityChoicePageBaseFixture<AboutYourClientComponent>;
  let component: AboutYourClientComponent;

  beforeEach(() => {
    fixture = ConfigureTestBedForPageComponent(AboutYourClientComponent);
    component = fixture.component;
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
    const textfield = fixture.debugElementByCss('#details');
    expect(textfield.classes['govuk-textarea--error']).toBeTruthy();
  });

  it('should bind value and notes to model on submit', () => {
    // when
    fixture.radioBoxIsClicked('#choice-yes');
    component.textInput.setValue('notes');
    fixture.detectChanges();
    fixture.submitIsClicked();

    // then
    expect(component.model.aboutYourClient.answer).toBe(true);
    expect(component.model.aboutYourClient.notes).toBe('notes');
  });

  it('should bind notes as null on selecting no', () => {
    // when
    fixture.radioBoxIsClicked('#choice-no');
    fixture.detectChanges();
    fixture.submitIsClicked();

    // then
    expect(component.model.aboutYourClient.answer).toBe(false);
    expect(component.model.aboutYourClient.notes).toBeNull();
  });
});
