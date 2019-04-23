import { IndividualJourneyModule } from './individual-journey.module';

describe('IndividualJourneyModule', () => {
  let module: IndividualJourneyModule;

  beforeEach(() => {
    module = new IndividualJourneyModule();
  });

  it('should create an instance', () => {
    expect(module).toBeTruthy();
  });
});
