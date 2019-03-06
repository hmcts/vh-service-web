import { ProfessionalCitizenModule } from './professional-citizen.module';

describe('ProfessionalCitizenModule', () => {
  let professionalCitizenModule: ProfessionalCitizenModule;

  beforeEach(() => {
    professionalCitizenModule = new ProfessionalCitizenModule();
  });

  it('should create an instance', () => {
    expect(professionalCitizenModule).toBeTruthy();
  });
});
