import { CrestBluePanelComponent } from 'src/app/modules/shared/crest-blue-panel/crest-blue-panel.component';
import { CanCreateComponent, IndividualJourneyComponentTestBed } from '../individual-base-component/individual-component-test-bed.spec';
import { DifferentHearingTypesComponent } from './different-hearing-types.component';
import { TestModuleMetadata, TestBed } from '@angular/core/testing';

describe('DifferentHearingTypesComponent', () => {
  it('can be created', () => {
    const component = IndividualJourneyComponentTestBed.createComponent({
      component: DifferentHearingTypesComponent,
      declarations: [ CrestBluePanelComponent ]
    });

    expect(component).toBeTruthy();

    // CanCreateComponent(DifferentHearingTypesComponent, (config: TestModuleMetadata) => {
    //    config.declarations.push([CrestBluePanelComponent]);
    // });
  });
});
