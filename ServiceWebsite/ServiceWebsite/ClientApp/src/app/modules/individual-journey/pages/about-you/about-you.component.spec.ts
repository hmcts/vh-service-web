import { AboutYouComponent } from './about-you.component';
import {
  ConfigureTestBedForPageComponent,
  SuitabilityChoicePageBaseFixture
} from '../../components/suitability-choice-page-base.component.spec';

describe('AboutYouComponent', () => {
  let fixture: SuitabilityChoicePageBaseFixture<AboutYouComponent>;
  let component: AboutYouComponent;

  beforeEach(() => {
    fixture = ConfigureTestBedForPageComponent(AboutYouComponent);
    component = fixture.component;
    fixture.detectChanges();
  });

  it('cannot proceed to next step before selecting a choice', () => {
    // when
    fixture.submitIsClicked();

    // then
    expect(component.isFormInvalid).toBeTruthy();

    // expect form to be erronous
    const formContainer = fixture.debugElementByCss('#form-container');
    expect(formContainer.classes['govuk-form-group--error']).toBeTruthy();

    // and error message to be displayed
    const errorMessage = fixture.debugElementByCss('#form-container .govuk-error-message');
    expect(errorMessage.nativeElement).toBeTruthy();
  });

  it('should clear error when selecting no', () => {
    // when
    fixture.submitIsClicked();

    // and
    fixture.radioBoxIsClicked('#choice-no');

    // then
    expect(component.isFormInvalid).toBeFalsy();
  });

  it('should clear error when selecting yes after having submitted', () => {
    // when
    fixture.submitIsClicked();

    // and
    fixture.radioBoxIsClicked('#choice-yes');

    // then
    expect(component.isFormInvalid).toBeFalsy();
  });

  it('should display text field when selecting yes', () => {
    // when
    fixture.radioBoxIsClicked('#choice-yes');

    // then
    expect(component.isFormInvalid).toBeFalsy();
  });

  it('should be invalid if submitting without having entered any text', () => {
    // when
    fixture.radioBoxIsClicked('#choice-yes');

    // and submitted
    fixture.submitIsClicked();

    // then
    expect(component.isFormInvalid).toBeTruthy();

    // and
    const textfield = fixture.debugElementByCss('#moreDetails');
    expect(textfield.classes['govuk-textarea--error']).toBeTruthy();
  });
});
