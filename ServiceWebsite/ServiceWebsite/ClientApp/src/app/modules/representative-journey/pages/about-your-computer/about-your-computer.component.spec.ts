import { CommonTests } from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';
import { AboutYourComputerComponent } from './about-your-computer.component';
import {
  RepresentativeJourneyStubs,
  RepresentativeJourneyComponentTestBed
} from '../representative-base-component/component-test-bed.spec';

describe('AboutYourComputerComponent', () => {
  it('cannot proceed to next step until pressing choice, after submit value is bound', () => {
    const fixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: AboutYourComputerComponent
    });

    CommonTests.cannotProceedUntilChoiceIsSelected(fixture);

    // and value is bound
    expect(fixture.componentInstance.model.camera).toBe(0);
  });

  it('should initialize choice value', () => {
    const component = new AboutYourComputerComponent(RepresentativeJourneyStubs.default);
    component.model.camera = 1;
    component.ngOnInit();
    expect(component.model.camera).toBe(1);
  });
});
