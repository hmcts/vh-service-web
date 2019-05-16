import { AboutYourComputerComponent } from './about-your-computer.component';
import { CanCreateComponent } from '../individual-base-component/component-test-bed.spec';
import { CannotProceeedUntilChoiceIsSelected } from '../../components/suitability-choice-page-base.component.spec';

describe('AboutYourComputerComponent', () => {
  it('can be created', () => {
    CanCreateComponent(AboutYourComputerComponent);
  });
  it('cannot proceed to next step until pressing choice, after submit value is bound', () => {
    const fixture = CannotProceeedUntilChoiceIsSelected(AboutYourComputerComponent);

    // and value is bound
    expect(fixture.component.model.camera).toBeTruthy();
  });
});
