import { CrestBluePanelComponent } from 'src/app/modules/shared/crest-blue-panel/crest-blue-panel.component';
import { CanCreateComponent } from '../individual-base-component/component-test-bed.spec';
import { DifferentHearingTypesComponent } from './different-hearing-types.component';
import { TestModuleMetadata } from '@angular/core/testing';

describe('DifferentHearingTypesComponent', () => {
  it('can be created', () => {
    CanCreateComponent(DifferentHearingTypesComponent, (config: TestModuleMetadata) => {
       config.declarations.push([CrestBluePanelComponent]);
    });
  });
});
