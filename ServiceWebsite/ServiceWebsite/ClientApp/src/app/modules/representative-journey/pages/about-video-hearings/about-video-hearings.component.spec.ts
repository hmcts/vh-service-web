import { CrestBluePanelComponent } from 'src/app/modules/shared/crest-blue-panel/crest-blue-panel.component';
import { RepresentativeJourneyComponentTestBed } from '../representative-base-component/representative-journey-component-test-bed.spec';
import { AboutVideoHearingsComponent } from './about-video-hearings.component';

describe('AboutVideoHearingsComponent', () => {
  it('can be created', () => {
    const fixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: AboutVideoHearingsComponent,
      declarations: [ CrestBluePanelComponent ]
    });
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
