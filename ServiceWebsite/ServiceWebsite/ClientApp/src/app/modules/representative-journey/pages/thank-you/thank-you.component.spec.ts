import { CanCreateComponent, RepresentativeJourneyComponentTestBed } from '../representative-base-component/component-test-bed.spec';
import { ThankYouComponent } from './thank-you.component';

describe('ThankYouComponent', () => {
  it('can be created', () => {
    const fixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: ThankYouComponent
    });
    expect(fixture).toBeTruthy();
  });
});
