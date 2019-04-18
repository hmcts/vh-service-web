import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class DocumentRedirectService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  // redirects the browser tab to a different url
  to(absoluteUrl: string) {
    this.document.location.href = absoluteUrl;
  }
}
