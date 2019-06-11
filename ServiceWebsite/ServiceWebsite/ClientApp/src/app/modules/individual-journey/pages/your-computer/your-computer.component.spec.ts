import { YourComputerComponent } from './your-computer.component';
import { CannotProceeedUntilChoiceIsSelected } from '../../components/suitability-choice-page-base.component.spec';
import { IndividualJourneyComponentTestBed } from '../individual-base-component/individual-component-test-bed.spec';

describe('YourComputerComponent', () => {
  it('cannot proceed to next step until pressing choice, after submit value is bound', () => {
    const fixture = CannotProceeedUntilChoiceIsSelected(YourComputerComponent);

    // and value is bound
    expect(fixture.componentInstance.model.computer).toBe(true);
  });

  it('should contain the scheduled date on init', () => {
    const fixture = IndividualJourneyComponentTestBed.createComponent({
      component: YourComputerComponent
    });

    expect(fixture.componentInstance.hearingDate).not.toBe(null);
  });
});
