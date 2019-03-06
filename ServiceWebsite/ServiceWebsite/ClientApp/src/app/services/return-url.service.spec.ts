import { TestBed, inject } from '@angular/core/testing';

import { ReturnUrlService } from './return-url.service';
import { SessionStorage } from './session-storage';
import { MockSessionStorage } from 'src/tests/mock-session-storage';

describe('ReturnUrlService', () => {

  let returnUrlService: ReturnUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReturnUrlService,
        { provide: SessionStorage, useClass: MockSessionStorage }
      ]
    });

    returnUrlService = TestBed.get(ReturnUrlService);
  });

  it('should return null if no key is stored', () => {
    expect(returnUrlService.popUrl()).toBeNull();
  });

  it('should delete the stored url after popping', () => {
    returnUrlService.setUrl('first url')
    expect(returnUrlService.popUrl()).toBe('first url');
    expect(returnUrlService.popUrl()).toBeNull();
  });

  it('should use the last stored url', () => {
    returnUrlService.setUrl('first url')
    returnUrlService.setUrl('second url')
    expect(returnUrlService.popUrl()).toBe('second url');
  });
});
