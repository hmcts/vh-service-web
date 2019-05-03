import { CrestBluePanelComponent } from 'src/app/modules/shared/crest-blue-panel/crest-blue-panel.component';
import { CanCreateComponent } from '../individual-base-component/component-test-bed.spec';
import { AboutHearingsComponent } from './about-hearings.component';
import { TestModuleMetadata } from '@angular/core/testing';
import { ContactUsComponent } from '../../../shared/contact-us/contact-us.component';

describe('AboutHearingsComponent', () => {
  it('can be created', () => {
    CanCreateComponent(AboutHearingsComponent, (config: TestModuleMetadata) => {
      config.declarations.push([ContactUsComponent]);
      config.declarations.push([CrestBluePanelComponent]);
    });
  });
});
