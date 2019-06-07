import { CanCreateComponent } from '../representative-base-component/component-test-bed.spec';
import { ThankYouComponent } from './thank-you.component';

describe('ThankYouComponent', () => {
  it('can be created', () => {
    CanCreateComponent(ThankYouComponent);
  });
});
