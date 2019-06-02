import { YourComputerComponent } from './your-computer.component';
import { CanCreateComponent } from '../representative-base-component/component-test-bed.spec';

describe('YourComputerComponent', () => {
  it('can be created', () => {
    CanCreateComponent(YourComputerComponent);
  });
});
