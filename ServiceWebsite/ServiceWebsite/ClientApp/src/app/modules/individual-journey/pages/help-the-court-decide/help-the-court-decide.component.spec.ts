import { IndividualJourneyComponentTestBed } from '../individual-base-component/individual-component-test-bed.spec';
import { HelpTheCourtDecideComponent } from './help-the-court-decide.component';

describe('HelpTheCourtDecideComponent', () => {
  it('can be created', () => {
    const fixture = IndividualJourneyComponentTestBed.createComponent({ component: HelpTheCourtDecideComponent });
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
