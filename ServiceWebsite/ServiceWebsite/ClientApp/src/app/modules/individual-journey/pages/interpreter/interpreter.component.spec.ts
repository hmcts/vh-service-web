import { InterpreterComponent } from './interpreter.component';
import { ConfigureTestBedForPageComponent } from '../../components/suitability-choice-page-base.component.spec';

describe('InterpreterComponent', () => {
  it('cannot proceed to next step until pressing choice, after submit value is bound', () => {
    const fixture = ConfigureTestBedForPageComponent(InterpreterComponent);
    const component = fixture.component;

    // when
    fixture.submitIsClicked();

    // then
    expect(component.isFormInvalid).toBeTruthy();

    // expect form to be erronous
    const formContainer = fixture.debugElementByCss('#form-container');
    expect(formContainer.classes['govuk-form-group--error']).toBeTruthy();

    // and error message to be displayed
    const errorMessage = fixture.debugElementByCss('#error-message');
    expect(errorMessage.nativeElement).toBeTruthy();

    // when selecting a radio button
    fixture.radioBoxIsClicked('#choice-yes');

    // then
    fixture.submitIsClicked();

    expect(component.model.interpreter).toBe(true);
  });
});
