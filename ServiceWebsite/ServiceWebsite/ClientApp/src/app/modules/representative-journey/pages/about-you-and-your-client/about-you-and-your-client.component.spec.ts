import { RepresentativeJourneyComponentTestBed } from './../representative-base-component/component-test-bed.spec';
import { CrestBluePanelComponent } from 'src/app/modules/shared/crest-blue-panel/crest-blue-panel.component';
import { AboutYouAndYourClientComponent } from './about-you-and-your-client.component';

describe('AboutYouAndYourClientComponent', () => {
  it('can be created', () => {
    const fixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: AboutYouAndYourClientComponent,
      declarations: [ CrestBluePanelComponent ]
    });
    expect(fixture).toBeTruthy();
  });
});
