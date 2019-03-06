import { ProfessionalModule } from './professional.module';

describe('ProfessionalModule', () => {
  let professionalModule: ProfessionalModule;

  beforeEach(() => {
    professionalModule = new ProfessionalModule();
  });

  it('should create an instance', () => {
    expect(professionalModule).toBeTruthy();
  });
});
