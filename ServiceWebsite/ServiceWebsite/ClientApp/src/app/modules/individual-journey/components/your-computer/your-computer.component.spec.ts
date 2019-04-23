import { CanCreateComponent } from '../individual-base-component/component-test-bed';
import { YourComputerComponent } from './your-computer.component';

describe('YourComputerComponent', () => {
  it('can be created', () => {
    CanCreateComponent(YourComputerComponent);
  });
});
