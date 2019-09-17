import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {CanComponentNavigate} from './can.component.navigate';

@Injectable({
  providedIn: 'root',
})
export class CanNavigateGuard implements CanDeactivate<CanComponentNavigate> {
  canDeactivate(component: CanComponentNavigate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
