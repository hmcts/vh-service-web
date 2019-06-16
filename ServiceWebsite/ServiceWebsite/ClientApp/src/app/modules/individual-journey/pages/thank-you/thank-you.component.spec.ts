import { IndividualJourneyComponentTestBed } from '../individual-base-component/individual-component-test-bed.spec';
import { ThankYouComponent } from './thank-you.component';

describe('ThankYouComponent', () => {
  it('should contain the scheduled date on init', () => {
    const fixture = IndividualJourneyComponentTestBed.createComponent({
      component: ThankYouComponent
    });

    expect(fixture.componentInstance.hearingDate).not.toBe(null);
  });
});
