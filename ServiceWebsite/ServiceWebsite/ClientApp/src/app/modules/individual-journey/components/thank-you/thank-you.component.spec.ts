import { CanCreateComponent } from '../individual-base-component/component-test-bed';
import { ThankYouComponent } from './thank-you.component';

describe('ThankYouComponent', () => {
  it('can be created', () => {
    CanCreateComponent(ThankYouComponent);
  });
});
