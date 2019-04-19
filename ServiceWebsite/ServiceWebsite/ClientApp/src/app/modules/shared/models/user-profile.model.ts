import { Constants } from 'src/app/modules/shared/constants';

export class UserProfile {
  public email;
  public role;

  get isProfessional(): boolean {
    return this.role === Constants.UserType.ProfessionalUser;
  }

  get isCitizen(): boolean {
    return this.role === Constants.UserType.Citizen;
  }
}
