import { CrestBluePanelComponent } from 'src/app/modules/shared/crest-blue-panel/crest-blue-panel.component';
import { IndividualJourneyComponentTestBed } from '../individual-base-component/individual-component-test-bed.spec';
import { DifferentHearingTypesComponent } from './different-hearing-types.component';

describe('DifferentHearingTypesComponent', () => {
  it('can be created', () => {
    const component = IndividualJourneyComponentTestBed.createComponent({
      component: DifferentHearingTypesComponent,
      declarations: [ CrestBluePanelComponent ]
    });

    expect(component).toBeTruthy();
  });
});
