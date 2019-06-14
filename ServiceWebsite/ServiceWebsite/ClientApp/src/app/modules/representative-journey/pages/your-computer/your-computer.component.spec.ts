import { YourComputerComponent } from './your-computer.component';
import { RepresentativeJourneyComponentTestBed } from '../representative-base-component/representative-journey-component-test-bed.spec';
import { CommonTests } from 'src/app/modules/base-journey/components/common-tests.spec';

describe('YourComputerComponent for representative', () => {
  it('cannot proceed to next step until pressing choice, after submit value is bound', () => {
    const fixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: YourComputerComponent
    });

    CommonTests.cannotProceedUntilChoiceIsSelected(fixture);

    // and value is bound
    expect(fixture.componentInstance.model.computer).toBe(true);
  });
});
