import { ContactUsComponent } from './../../../shared/contact-us/contact-us.component';
import { ConfigureTestBedFor } from '../individual-base-component/component-test-bed.spec';
import { InterpreterComponent } from './interpreter.component';
import { By } from '@angular/platform-browser';
import { TestModuleMetadata } from '@angular/core/testing';
import { ShowDetailsComponent } from 'src/app/modules/shared/show-details/show-details.component';

describe('InterpreterComponent', () => {
  it('cannot proceed to next step before selecting a choice', () => {
    const fixture = ConfigureTestBedFor(InterpreterComponent, (config: TestModuleMetadata) => {
      config.declarations.push(ShowDetailsComponent);
      config.declarations.push(ContactUsComponent);
    });
    const component = fixture.componentInstance;
    fixture.detectChanges();

    // when
    const continueButton = fixture.debugElement.query(By.css('.govuk-button'));
    continueButton.nativeElement.click();
    fixture.detectChanges();

    // then
    expect(component.isFormInvalid).toBeTruthy();

    // expect form to be erronous
    const formContainer = fixture.debugElement.query(By.css('#form-container'));
    expect(formContainer.classes['govuk-form-group--error']).toBeTruthy();

    // and error message to be displayed
    const errorMessage = fixture.debugElement.query(By.css('#error-message'));
    expect(errorMessage.nativeElement).toBeTruthy();

    // when selecting a radio button
    const radioButton = fixture.debugElement.query(By.css('#choice-yes'));
    radioButton.nativeElement.click();
    fixture.detectChanges();

    // then
    expect(component.isFormInvalid).toBeFalsy();
  });
});
