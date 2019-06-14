import { CommonTests } from 'src/app/modules/base-journey/components/common-tests.spec';
import { YourComputerComponent } from './your-computer.component';
import { IndividualJourneyComponentTestBed, IndividualJourneyStubs } from '../individual-base-component/individual-component-test-bed.spec';

describe('YourComputerComponent', () => {

  it('cannot proceed to next step until pressing choice, after submit value is bound', () => {
    const fixture = IndividualJourneyComponentTestBed.createComponent({
      component: YourComputerComponent
    });

    CommonTests.cannotProceedUntilChoiceIsSelected(fixture);

    // and value is bound
    expect(fixture.componentInstance.model.computer).toBe(true);
  });

  it('should contain the scheduled date on init', () => {
    const component = new YourComputerComponent(IndividualJourneyStubs.default);
    component.ngOnInit();
    expect(component.hearingDate).not.toBe(null);
  });
});
