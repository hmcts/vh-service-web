import { IndividualJourneyComponentTestBed } from './../individual-base-component/individual-component-test-bed.spec';
import { CrestBluePanelComponent } from 'src/app/modules/shared/crest-blue-panel/crest-blue-panel.component';
import { AboutHearingsComponent } from './about-hearings.component';

describe('AboutHearingsComponent', () => {
  it('can be created', () => {
    const fixture = IndividualJourneyComponentTestBed.createComponent({
      component: AboutHearingsComponent,
      declarations: [ CrestBluePanelComponent ]
    });

    expect(fixture).toBeTruthy();
  });
});
