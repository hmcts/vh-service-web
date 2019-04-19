import { IndividualJourneyModule } from './individual-journey.module';

describe('CitizenModule', () => {
  let citizenModule: IndividualJourneyModule;

  beforeEach(() => {
    citizenModule = new IndividualJourneyModule();
  });

  it('should create an instance', () => {
    expect(citizenModule).toBeTruthy();
  });
});
