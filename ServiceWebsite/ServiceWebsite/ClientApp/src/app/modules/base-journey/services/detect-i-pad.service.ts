import { Injectable, } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DetectIPadService {
  _navigator = <any>navigator;

  detectiPad(): boolean {
    return this.detectByAgentiPad();
  }

  private detectByAgentiPad() {
    if (this._navigator && this._navigator.userAgent && this._navigator.userAgent != null) {
      const strUserAgent = this._navigator.userAgent.toLowerCase();
      const arrMatches = strUserAgent.match(/(iphone|ipod|ipad)/);
      if (arrMatches != null) {
        return true;
      } else {
        return false;
      }
    }
  }
}
