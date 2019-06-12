import { InterpreterComponent } from './interpreter.component';
import { CannotProceeedUntilChoiceIsSelected } from '../../components/suitability-choice-page-base.component.spec';

describe('InterpreterComponent', () => {
  it('cannot proceed to next step until pressing choice, after submit value is bound', () => {
    const fixture = CannotProceeedUntilChoiceIsSelected(InterpreterComponent);

    // and value is bound
    expect(fixture.componentInstance.model.interpreter).toBe(true);
  });
});
