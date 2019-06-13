import { CommonIndividualComponentTests } from './../individual-base-component/individual-component-test-bed.spec';
import { HelpTheCourtDecideComponent } from './help-the-court-decide.component';

describe('HelpTheCourtDecideComponent', () => {
  it('can proceed when clicking next', () => {
    CommonIndividualComponentTests.continuesWhenButtonIsPressed({ component: HelpTheCourtDecideComponent })
  });
});
