import { TestBed, inject } from '@angular/core/testing';

import { DocumentRedirectService } from './document-redirect.service';

describe('DocumentRedirectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentRedirectService]
    });
  });

  it('should be created', inject([DocumentRedirectService], (service: DocumentRedirectService) => {
    expect(service).toBeTruthy();
  }));
});
