import { YourInternetConnectionComponent } from './your-internet-connection.component';
import { CannotProceeedUntilChoiceIsSelected } from '../../components/suitability-choice-page-base.component.spec';

describe('InterpreterComponent', () => {
  it('cannot proceed to next step until pressing choice, after submit value is bound', () => {
    const fixture = CannotProceeedUntilChoiceIsSelected(YourInternetConnectionComponent);

    // and value is bound
    expect(fixture.componentInstance.model.internet).toBe(true);
  });
});
