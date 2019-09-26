import { RepresentativeJourneySteps } from './../../representative-journey-steps';
import { AppointingABarristerComponent } from './appointing-a-barrister.component';
import { AppointingBarrister, AppointingBarristerDetails } from '../../representative-suitability.model';
import {
  RepresentativeJourneyStubs,
  RepresentativeJourneyComponentTestBed
} from '../representative-base-component/representative-journey-component-test-bed.spec';
import { SuitabilityChoiceComponentFixture } from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';
import { BackNavigationStubComponent } from '../../../../testing/stubs/back-navigation-stub';

describe('AppointingABarristerComponent', () => {
  const journey = RepresentativeJourneyStubs.journeySpy;
  const component = new AppointingABarristerComponent(journey);

  it(`should go to ${RepresentativeJourneySteps.OtherInformation} on continuing`, () => {
    const componentFixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: AppointingABarristerComponent,
      declarations: [BackNavigationStubComponent],
      journey: journey
    });

    const fixture = new SuitabilityChoiceComponentFixture(componentFixture);
    fixture.radioBoxIsClicked('#i-am-barrister');

    fixture.submitIsClicked();
  });

  it('should show barrister details if the selected option is barrister will be appointed', () => {
    component.toggelBarristerDetails(AppointingBarrister.BarristerWillBeAppointed);
    expect(component.showBarristerDetails).toBeTruthy();
  });
  it('should show barrister details if the selected option is barrister will be appointed', () => {
    component.toggelBarristerDetails(AppointingBarrister.BarristerWillBeAppointed);
    expect(component.showBarristerDetails).toBeTruthy();
    component.barristerName.setValue('Smith');
    component.barristerChambers.setValue('Chambers');
    component.barristerEmail.setValue('Email');

    component.toggelBarristerDetails(AppointingBarrister.IAmAppointedBarrister);
    expect(component.showBarristerDetails).toBeFalsy();
    expect(component.barristerName.value).toBe('');
    expect(component.barristerChambers.value).toBe('');
    expect(component.barristerEmail.value).toBe('');
  });
  it('should validate barrister email and show error if email is invalid', () => {
    component.barristerEmail.setValue('Email');
    component.barristerEmail.markAsTouched();
    component.blurEmail();
    expect(component.isValidEmail).toBeFalsy();
  });
  it('should validate barrister email and show no error if email is empty', () => {
    component.barristerEmail.setValue('');
    component.barristerEmail.markAsTouched();
    component.blurEmail();
    expect(component.isValidEmail).toBeTruthy();
  });
  it('should successfully validate barrister email', () => {
    component.barristerEmail.setValue('Email@email.com');
    component.barristerEmail.markAsTouched();
    component.blurEmail();
    expect(component.isValidEmail).toBeTruthy();
  });
  it('should initialize component with empty values for barrister details', () => {
    component.ngOnInit();
    expect(component.barristerName.value).toBe('');
    expect(component.barristerChambers.value).toBe('');
    expect(component.barristerEmail.value).toBe('');
  });
  it('should initialize component with model values for barrister details', () => {
    component.model.appointingBarristerDetails = new AppointingBarristerDetails();
    component.model.appointingBarristerDetails.fullName = 'Smith';
    component.model.appointingBarristerDetails.chambers = 'Chamber 1';
    component.model.appointingBarristerDetails.email = 'email@email.com';
    component.model.appointingBarrister = AppointingBarrister.BarristerWillBeAppointed;
    component.ngOnInit();
    expect(component.barristerName.value).toBe('Smith');
    expect(component.barristerChambers.value).toBe('Chamber 1');
    expect(component.barristerEmail.value).toBe('email@email.com');
  });
});

