import { BaseJourneyModule } from './base-journey.module';

describe('BaseJourneyModule', () => {
  let module: BaseJourneyModule;

  beforeEach(() => {
    module = new BaseJourneyModule();
  });

  it('should create an instance', () => {
    expect(module).toBeTruthy();
  });
});
