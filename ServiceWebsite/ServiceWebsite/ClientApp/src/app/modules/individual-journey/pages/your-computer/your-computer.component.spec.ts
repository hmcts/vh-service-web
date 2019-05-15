import { CanCreateComponent } from '../individual-base-component/component-test-bed.spec';
import { YourComputerComponent } from './your-computer.component';
import { CannotProceeedUntilChoiceIsSelected } from '../../components/suitability-choice-page-base.component.spec';

describe('YourComputerComponent', () => {
  it('cannot proceed to next step until pressing choice, after submit value is bound', () => {
    const fixture = CannotProceeedUntilChoiceIsSelected(YourComputerComponent);
    // and value is bound
    expect(fixture.component.model.computer).toBe(true);
  });
});
