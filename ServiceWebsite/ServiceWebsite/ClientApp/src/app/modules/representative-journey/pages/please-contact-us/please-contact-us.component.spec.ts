import { RepresentativeJourneyComponentTestBed } from './../representative-base-component/component-test-bed.spec';
import { PleaseContactUsComponent } from './please-contact-us.component';

describe('PleaseContactUsComponent', () => {
  it('can be created', () => {
    const fixture = RepresentativeJourneyComponentTestBed.createComponent({component: PleaseContactUsComponent});
    expect(fixture).toBeTruthy();
  });
});
