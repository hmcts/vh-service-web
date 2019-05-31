import { CrestBluePanelComponent } from 'src/app/modules/shared/crest-blue-panel/crest-blue-panel.component';
import { CanCreateComponent } from '../representative-base-component/component-test-bed.spec';
import { AboutVideoHearingsComponent } from './about-video-hearings.component';
import { TestModuleMetadata } from '@angular/core/testing';

describe('AboutVideoHearingsComponent', () => {
  it('can be created', () => {
    CanCreateComponent(AboutVideoHearingsComponent, (config: TestModuleMetadata) => {
      config.declarations.push([CrestBluePanelComponent]);
    });
  });
});