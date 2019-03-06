import { CitizenModule } from './citizen.module';

describe('CitizenModule', () => {
  let citizenModule: CitizenModule;

  beforeEach(() => {
    citizenModule = new CitizenModule();
  });

  it('should create an instance', () => {
    expect(citizenModule).toBeTruthy();
  });
});
