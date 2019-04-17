import { Injectable } from '@angular/core';

const SESSION_STORAGE_KEY = 'RETURN_URL';

@Injectable()
export class ReturnUrlService {
  // return any existing url and remove it from storage, will return null if no return url has been set
  popUrl(): string {
    const returnUrl = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (returnUrl) {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      return returnUrl;
    }

    return null;
  }

  // set the return url to use after login
  setUrl(url: string): void {
    sessionStorage.setItem(SESSION_STORAGE_KEY, url);
  }
}
