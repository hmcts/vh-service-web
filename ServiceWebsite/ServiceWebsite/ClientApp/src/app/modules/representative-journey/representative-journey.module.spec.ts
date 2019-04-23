import { RepresentativeJourneyModule } from './representative-journey.module';

describe('RepresentativeJourneyModule', () => {
  let professionalModule: RepresentativeJourneyModule;

  beforeEach(() => {
    professionalModule = new RepresentativeJourneyModule();
  });

  it('should create an instance', () => {
    expect(professionalModule).toBeTruthy();
  });
});
