import { CommonTests } from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';
import { YourComputerComponent } from './your-computer.component';
import { RepresentativeJourneyComponentTestBed } from '../representative-base-component/component-test-bed.spec';

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
