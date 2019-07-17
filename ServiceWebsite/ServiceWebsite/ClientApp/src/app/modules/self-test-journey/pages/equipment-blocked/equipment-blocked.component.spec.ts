import { EquipmentBlockedComponent } from './equipment-blocked.component';
import { SelfTestJourneyComponentTestBed } from '../self-test-base-component/self-test-component-test-bed.spec';

describe('EquipmentBlockedComponent', () => {
  it('can be created', () => {
    const fixture = SelfTestJourneyComponentTestBed.createComponent({ component: EquipmentBlockedComponent });
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});




