import { TestBed } from '@angular/core/testing';

import { RefreshTokenParameterInterceptor } from './refresh-token-parameter.interceptor';

describe('RefreshTokenParameterInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RefreshTokenParameterInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RefreshTokenParameterInterceptor = TestBed.inject(RefreshTokenParameterInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
