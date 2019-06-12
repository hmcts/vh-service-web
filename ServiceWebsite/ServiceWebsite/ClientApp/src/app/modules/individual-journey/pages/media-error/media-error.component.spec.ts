import { IndividualJourneyComponentTestBed } from '../individual-base-component/individual-component-test-bed.spec';
import { MediaErrorComponent } from './media-error.component';

describe('MediaErrorComponent', () => {
  it('can be created', () => {
    const fixture = IndividualJourneyComponentTestBed.createComponent({ component: MediaErrorComponent });
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});




