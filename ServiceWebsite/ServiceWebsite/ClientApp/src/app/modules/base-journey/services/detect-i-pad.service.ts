import { Injectable, } from '@angular/core';
import { window } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DetectIPadService {
  _navigator = <any>navigator;
  _window = <any>window;

  detectiPad(): boolean {
    return this.detectByAgentiPad() || this.detectByScreeniPad();
  }

  private detectByScreeniPad() {
    // iPad, iPad 2, iPad Mini, iPad 3, 4, 5, Mini 2, Mini 3, Mini 4, Air, Air 2, Pro 9.7
    // iPad Pro 10.5 or iPad Pro 12.9, Pro 12.9 (2nd Gen)
    return ((this._window.screen.height / this._window.screen.width == 1024 / 768) ||
      (this._window.screen.height / this._window.screen.width == 1112 / 834) ||
      (this._window.screen.height / this._window.screen.width == 1366 / 1024)); 
  }

  private detectByAgentiPad() {
    if (this._navigator && this._navigator.userAgent && this._navigator.userAgent != null) {
      var strUserAgent = this._navigator.userAgent.toLowerCase();
      var arrMatches = strUserAgent.match(/(iphone|ipod|ipad)/);
      if (arrMatches != null)
        return true;
    } else {
      return false;
    }
  }
}
