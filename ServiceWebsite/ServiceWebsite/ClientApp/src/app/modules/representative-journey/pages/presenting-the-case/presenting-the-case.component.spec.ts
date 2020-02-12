import { RepresentativeJourneySteps } from './../../representative-journey-steps';
import { PresentingTheCaseComponent } from './presenting-the-case.component';
import { PresentingTheCase, PresentingCaseDetails } from '../../representative-suitability.model';
import {
  RepresentativeJourneyStubs,
  RepresentativeJourneyComponentTestBed
} from '../representative-base-component/representative-journey-component-test-bed.spec';
import { SuitabilityChoiceComponentFixture } from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';
import { BackNavigationStubComponent } from '../../../../testing/stubs/back-navigation-stub';
import { RepresentativeJourney } from '../../representative-journey';
import { ChoiceTextboxComponent } from 'src/app/modules/base-journey/components/choice-textbox.component';
import { Logger } from 'src/app/services/logger';
import { MockLogger } from 'src/app/testing/mocks/mock-logger';
import { tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
describe('PresentingTheCaseComponent', () => {
  let fixture: SuitabilityChoiceComponentFixture;
  let component: PresentingTheCaseComponent;
  let journey: jasmine.SpyObj<RepresentativeJourney>;
  let componentFixture: any;
  beforeEach(() => {
    journey = RepresentativeJourneyStubs.journeySpy;
    componentFixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: PresentingTheCaseComponent,
      declarations: [
        ChoiceTextboxComponent,
        BackNavigationStubComponent
      ],
      providers: [{ provide: Logger, useClass: MockLogger },
      {
        provide: ActivatedRoute, useValue: { queryParams: from([]) }
      }
      ],
      journey: journey
    });
    component = componentFixture.componentInstance;
    fixture = new SuitabilityChoiceComponentFixture(componentFixture);
    fixture.detectChanges();
  });
  it(`should go to ${RepresentativeJourneySteps.OtherInformation} on continuing`, () => {
    fixture.radioBoxIsClicked('#i-will-be-presenting');
    fixture.submitIsClicked();
    expect(journey.goto).toHaveBeenCalledWith(RepresentativeJourneySteps.OtherInformation);
  });
  it('should not show presenting the case person details if the selected option is I will be presenting', () => {
    component.toggelPresenterCaseDetails(PresentingTheCase.IWillBePresentingTheCase);
    expect(component.showPresenterDetails).toBeFalsy();
  });
  it('should show presenting the case details if the selected option is someone will be presenting', () => {
    component.toggelPresenterCaseDetails(PresentingTheCase.SomeoneWillBePresenting);
    expect(component.showPresenterDetails).toBeTruthy();
    component.presentingCaseName.setValue('Smith');
    component.presentingCaseEmail.setValue('Email@email.test');
    component.toggelPresenterCaseDetails(PresentingTheCase.IWillBePresentingTheCase);
    expect(component.showPresenterDetails).toBeFalsy();
    expect(component.presentingCaseName.value).toBe('');
    expect(component.presentingCaseEmail.value).toBe('');
  });
  it('should validate presenting the case person email and show error if email is invalid', () => {
    component.presentingCaseEmail.setValue('Email');
    component.presentingCaseEmail.markAsTouched();
    component.blurEmail();
    expect(component.isValidEmail).toBeFalsy();
  });
  it('should validate presenting person email and show no error if email is empty', () => {
    component.presentingCaseEmail.setValue('');
    component.presentingCaseEmail.markAsTouched();
    component.blurEmail();
    expect(component.isValidEmail).toBeTruthy();
  });
  it('should successfully validate presenting the case person email', () => {
    component.presentingCaseEmail.setValue('Email@email.com');
    component.presentingCaseEmail.markAsTouched();
    component.blurEmail();
    expect(component.isValidEmail).toBeTruthy();
  });
  it('should initialize component with empty values for presenting person details', () => {
    component.ngOnInit();
    expect(component.presentingCaseName.value).toBe('');
    expect(component.presentingCaseEmail.value).toBe('');
  });
  it('should initialize component with model values for barristerpresenting person details', () => {
    component.model.presentingCaseDetails = new PresentingCaseDetails();
    component.model.presentingCaseDetails.fullName = 'Smith';
    component.model.presentingCaseDetails.email = 'email@email.com';
    component.model.presentingTheCase = PresentingTheCase.SomeoneWillBePresenting;
    component.ngOnInit();
    expect(component.presentingCaseName.value).toBe('Smith');
    expect(component.presentingCaseEmail.value).toBe('email@email.com');
  });
  it('should set validations for the person name who is presenting the case', () => {
    component.ngOnInit();
    expect(component.form.controls['presentingCaseName'].validator).toBeTruthy();
  });
  it('should validations returns invalid for the person name', () => {
    component.ngOnInit();
    component.form.controls['presentingCaseName'].setValue('aa%aa');
    component.form.controls['presentingCaseName'].markAsDirty();
    expect(component.presentingCaseName.invalid).toBeTruthy();
    expect(component.presentingCaseNameInvalid).toBeTruthy();
  });
});

describe('PresentingTheCaseComponentEditMode', () => {
  let fixture: SuitabilityChoiceComponentFixture;
  let component: PresentingTheCaseComponent;
  let journey: jasmine.SpyObj<RepresentativeJourney>;
  let componentFixture: any;
  beforeEach(() => {
    journey = RepresentativeJourneyStubs.journeySpy;
    componentFixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: PresentingTheCaseComponent,
      declarations: [
        ChoiceTextboxComponent,
        BackNavigationStubComponent
      ],
      providers: [
        { provide: Logger, useClass: MockLogger },
        { provide: ActivatedRoute, useValue: { queryParams: from([{ mode: 'Edit' }]) } }
      ],
      journey: journey
    });
    component = componentFixture.componentInstance;
    fixture = new SuitabilityChoiceComponentFixture(componentFixture);
    fixture.detectChanges();
  });
  it(`should go to ${RepresentativeJourneySteps.CheckYourAnswers} on continuing when mode is Edit`, () => {
    component = componentFixture.componentInstance;
    fixture = new SuitabilityChoiceComponentFixture(componentFixture);
    fixture.detectChanges();
    fixture.radioBoxIsClicked('#i-will-be-presenting');
    fixture.submitIsClicked();
    expect(journey.goto).toHaveBeenCalledWith(RepresentativeJourneySteps.CheckYourAnswers);
  });
});
