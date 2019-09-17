import {Observable} from 'rxjs';

export interface CanComponentNavigate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
