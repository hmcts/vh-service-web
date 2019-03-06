import { Injectable } from '@angular/core';
import { SessionStorage } from './session-storage';

const SESSION_STORAGE_KEY: string = 'RETURN_URL';

@Injectable()
export class ReturnUrlService {

  constructor(private storage: SessionStorage) { }

  // return any existing url and remove it from storage, will return null if no return url has been set
  popUrl(): string {
    let returnUrl = this.storage.getItem(SESSION_STORAGE_KEY);
    if (returnUrl) {
      this.storage.removeItem(SESSION_STORAGE_KEY);
      return returnUrl;
    }

    return null;
  }

  // set the return url to use after login
  setUrl(url: string): void {
    this.storage.setItem(SESSION_STORAGE_KEY, url);
  }
}
