import { AboutYourComputerComponent } from './about-your-computer.component';
import { CanCreateComponent } from '../representative-base-component/component-test-bed.spec';
import { CannotProceeedUntilChoiceIsSelected } from '../../components/suitability-choice-page-base.component.spec';

describe('AboutYourComputerComponent', () => {
  it('can be created', () => {
    CanCreateComponent(AboutYourComputerComponent);
  });
  it('cannot proceed to next step until pressing choice, after submit value is bound', () => {
    const fixture = CannotProceeedUntilChoiceIsSelected(AboutYourComputerComponent);

    // and value is bound
    expect(fixture.component.model.camera).toBe(0);
  });
  it('should initialize choice value', () => {
    const fixture = CannotProceeedUntilChoiceIsSelected(AboutYourComputerComponent);
    fixture.component.model.camera = 1;
    // and value is bound
    fixture.component.ngOnInit();
    expect(fixture.component.model.camera).toBe(1);
  });
});
