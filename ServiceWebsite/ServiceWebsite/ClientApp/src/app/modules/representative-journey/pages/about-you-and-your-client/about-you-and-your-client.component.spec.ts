import { CrestBluePanelComponent } from 'src/app/modules/shared/crest-blue-panel/crest-blue-panel.component';
import { CanCreateComponent } from '../representative-base-component/component-test-bed.spec';
import { AboutYouAndYourClientComponent } from './about-you-and-your-client.component';
import { TestModuleMetadata } from '@angular/core/testing';

describe('AboutYouAndYourClientComponent', () => {
  it('can be created', () => {
    CanCreateComponent(AboutYouAndYourClientComponent, (config: TestModuleMetadata) => {
      config.declarations.push([CrestBluePanelComponent]);
    });
  });
});
