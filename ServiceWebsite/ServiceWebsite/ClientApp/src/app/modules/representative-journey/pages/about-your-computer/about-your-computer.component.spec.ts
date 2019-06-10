import { AboutYourComputerComponent } from './about-your-computer.component';
import { CanCreateComponent } from '../representative-base-component/component-test-bed.spec';
import { CannotProceeedUntilChoiceIsSelected } from '../../components/suitability-choice-page-base.component.spec';

import { RepresentativeJourney } from '../../representative-journey';
import { RepresentativeStepsOrderFactory } from '../../representative-steps-order.factory';
import { MutableRepresentativeSuitabilityModel } from '../../mutable-representative-suitability.model';
import { Hearing } from '../../../base-journey/participant-suitability.model';

describe('AboutYourComputerComponent', () => {
  it('can be created', () => {
    CanCreateComponent(AboutYourComputerComponent);
  });
  it('cannot proceed to next step until pressing choice, after submit value is bound', () => {
    const fixture = CannotProceeedUntilChoiceIsSelected(AboutYourComputerComponent);

    // and value is bound
    expect(fixture.component.model.camera).toBe(0);
  });

  describe('AboutYourComputerComponent features', () => {
    const stepsOrderFactory = new RepresentativeStepsOrderFactory();
    const hearing = new Hearing();
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 2);
    hearing.scheduleDateTime = tomorrow;
    const model = new MutableRepresentativeSuitabilityModel();
    model.hearing = hearing;
    const listModel = [model];
    const journey = new RepresentativeJourney(stepsOrderFactory);
    journey.forSuitabilityAnswers(listModel);

    it('should initialize choice value', () => {
      const component = new AboutYourComputerComponent(journey);
      component.model.camera = 1;
      component.ngOnInit();
      expect(component.model.camera).toBe(1);
    });
  });
});
