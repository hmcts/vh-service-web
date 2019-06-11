import { AboutYouComponent } from './about-you.component';
import {
  ConfigureTestBedForTextboxPageComponent
} from 'src/app/modules/base-journey/components/suitability-choice-textbox-page-base.component.spec';
import {
  SuitabilityChoiceTextboxPageBaseFixture
} from 'src/app/modules/base-journey/components/suitability-choice-page-base.component.spec';
import { TestModuleMetadata } from '@angular/core/testing';
import { IndividualJourney } from '../../individual-journey';
import { IndividualStepsOrderFactory } from '../../individual-steps-order.factory';
import { DeviceType } from '../../services/device-type';
import { MutableIndividualSuitabilityModel } from '../../mutable-individual-suitability.model';
import { Hearing } from 'src/app/modules/base-journey/participant-suitability.model';

describe('AboutYouComponent', () => {
  let fixture: SuitabilityChoiceTextboxPageBaseFixture<AboutYouComponent>;
  let component: AboutYouComponent;

  const deviceType = jasmine.createSpyObj<DeviceType>(['isMobile']);
  const individualStepsOrderFactory = new IndividualStepsOrderFactory(deviceType);
  const journey = new IndividualJourney(individualStepsOrderFactory);
  const journeyModel = new MutableIndividualSuitabilityModel();


  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(tomorrow.getDate() + 2);

  const getModelForHearing = (id: string, scheduledDateTime: Date) => {
    const model = new MutableIndividualSuitabilityModel();
    model.hearing = new Hearing(id, scheduledDateTime);
    return model;
  };

  const suitabilityAnswers = {
    oneUpcomingHearing: [
      getModelForHearing('upcoming hearing id', tomorrow)
    ]
  };

  beforeEach(() => {
    journey.forSuitabilityAnswers(suitabilityAnswers.oneUpcomingHearing);
    fixture = ConfigureTestBedForTextboxPageComponent(AboutYouComponent,
      (configuration: TestModuleMetadata) => {
        configuration.providers.push({ provide: IndividualJourney, useValue: journey });
      });
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
    expect(component.journey.model.aboutYou.answer).toBe(true);
    expect(component.journey.model.aboutYou.notes).toBe('notes');
  });

  it('should bind notes as null on selecting no', () => {
    // when
    fixture.radioBoxIsClicked('#choice-no');
    fixture.detectChanges();
    fixture.submitIsClicked();

    // then
    expect(component.journey.model.aboutYou.answer).toBe(false);
    expect(component.journey.model.aboutYou.notes).toBeNull();
  });
});
