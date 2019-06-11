import { HearingSuitabilityComponent } from './hearing-suitability.component';
import { RepresentativeJourneyComponentTestBed } from '../representative-base-component/component-test-bed.spec';

describe('HearingSuitabilityComponent', () => {
  it('can be created', () => {
    const fixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: HearingSuitabilityComponent
    });
    expect(fixture).toBeTruthy();
  });
});
